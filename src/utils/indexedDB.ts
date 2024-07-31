import { Certificate, Supplier } from '../components/data/data';
const DB_NAME = 'exampleDB';
const DB_VERSION = 1;
const STORE_CERTIFICATES = 'certificates';
const STORE_SUPPLIERS = 'suppliers';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_CERTIFICATES)) {
        db.createObjectStore(STORE_CERTIFICATES, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(STORE_SUPPLIERS)) {
        const supplierStore = db.createObjectStore(STORE_SUPPLIERS, {
          keyPath: 'supplierIndex',
          autoIncrement: false,
        });

        supplierStore.transaction.oncomplete = () => {
          const supplierTransaction = db.transaction(
            STORE_SUPPLIERS,
            'readwrite',
          );
          const supplierStoreTransaction =
            supplierTransaction.objectStore(STORE_SUPPLIERS);

          const suppliers: Supplier[] = [
            { supplierIndex: 1, name: 'ANDEMIS GmbH', city: 'Stuttgart' },
            { supplierIndex: 2, name: 'IMLER AG', city: 'Berlin' },
          ];

          suppliers.forEach((supplier) => {
            supplierStoreTransaction.add(supplier);
          });

          supplierTransaction.oncomplete = () => {
            console.log('Suppliers added successfully');
          };

          supplierTransaction.onerror = (e) => {
            console.error('Error adding suppliers:', e);
          };
        };
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

const initDB = async (): Promise<boolean> => {
  try {
    await openDB();
    return true;
  } catch (error) {
    console.error('Error during initDB', error);
    return false;
  }
};

// CRUD Operations for Certificates
const addData = async (data: Certificate[]): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_CERTIFICATES, 'readwrite');
  const store = transaction.objectStore(STORE_CERTIFICATES);

  const promises = data.map((item) => {
    return new Promise<void>((resolve, reject) => {
      const addRequest = store.add({
        ...item,
        validFrom: item.validFrom.toISOString(),
        validTo: item.validTo.toISOString(),
      });

      addRequest.onsuccess = () => resolve();
      addRequest.onerror = () => reject(addRequest.error);
    });
  });

  await Promise.all(promises);

  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

const getData = async (): Promise<Certificate[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_CERTIFICATES, 'readonly');
  const store = transaction.objectStore(STORE_CERTIFICATES);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result.map((item: any) => ({
        ...item,
        validFrom: new Date(item.validFrom),
        validTo: new Date(item.validTo),
      }));
      resolve(result);
    };
    request.onerror = () => reject(request.error);
  });
};

const getCertificateById = async (id: number): Promise<Certificate | null> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_CERTIFICATES, 'readonly');
  const store = transaction.objectStore(STORE_CERTIFICATES);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      if (request.result) {
        const result = {
          ...request.result,
          supplier: {
            name: request.result.supplier.name,
            supplierIndex: request.result.supplier.supplierIndex,
            city: request.result.supplier.city,
          },
          validFrom: new Date(request.result.validFrom),
          validTo: new Date(request.result.validTo),
        };
        resolve(result);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
};

const updateData = async (data: Certificate): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_CERTIFICATES, 'readwrite');
  const store = transaction.objectStore(STORE_CERTIFICATES);

  return new Promise<void>((resolve, reject) => {
    const updateRequest = store.put({
      ...data,
      supplier: {
        name: data.supplier.name,
        supplierIndex: data.supplier.supplierIndex,
        city: data.supplier.city,
      },
      validFrom: data.validFrom.toISOString(),
      validTo: data.validTo.toISOString(),
    });

    updateRequest.onsuccess = () => resolve();
    updateRequest.onerror = () => reject(updateRequest.error);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};
const deleteData = async (id: number): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_CERTIFICATES, 'readwrite');
  const store = transaction.objectStore(STORE_CERTIFICATES);

  return new Promise<void>((resolve, reject) => {
    const deleteRequest = store.delete(id);

    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = () => reject(deleteRequest.error);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

// CRUD Operations for Suppliers
export const searchSuppliers = async (
  name: string,
  supplierIndex: number | null,
  city: string,
): Promise<Supplier[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_SUPPLIERS, 'readonly');
  const store = transaction.objectStore(STORE_SUPPLIERS);

  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result.filter((supplier: Supplier) => {
        return (
          supplier.name.toLowerCase().includes(name.toLowerCase()) &&
          (!supplierIndex || supplier.supplierIndex === supplierIndex) &&
          (!city || supplier.city?.toLowerCase().includes(city.toLowerCase()))
        );
      });
      resolve(result);
    };
    request.onerror = () => reject(request.error);
  });
};

export { initDB, addData, getData, getCertificateById, updateData, deleteData };
