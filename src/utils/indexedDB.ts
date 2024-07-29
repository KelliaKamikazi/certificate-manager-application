const DB_NAME = 'exampleDB';
const DB_VERSION = 1;
const STORE_NAME = 'certificates';
import { Certificate, Supplier } from '../components/data/data';

export const searchSuppliers = async (
  name: string,
  s_index: number | null,
  city: string,
): Promise<Supplier[]> => {
  const db = await openDB();
  const transaction = db.transaction('suppliers', 'readonly');
  const store = transaction.objectStore('suppliers');

  const request = store.getAll();
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result.filter((supplier: Supplier) => {
        return (
          supplier.name.includes(name) &&
          (s_index === null || supplier.s_index === s_index) &&
          supplier.city?.includes(city)
        );
      });
      resolve(result);
    };
    request.onerror = () => reject(request.error);
  });
};

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
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

// CRUD OPERATIONS
const addData = async (data: Certificate[]): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  const promises = data.map((item) => {
    return new Promise<void>((resolve, reject) => {
      const addRequest = store.add({
        ...item,
        supplier: {
          name: item.supplier.name,
          s_index: item.supplier.supplierIndex,
          city: item.supplier.city,
        },
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
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result.map((item: any) => ({
        ...item,
        supplier: {
          name: item.supplier.name,
          s_index: item.supplier.s_index,
          city: item.supplier.city,
        },
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
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      if (request.result) {
        const result = {
          ...request.result,
          supplier: {
            name: request.result.supplier.name,
            s_index: request.result.supplier.s_index,
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
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<void>((resolve, reject) => {
    const updateRequest = store.put({
      ...data,
      supplier: {
        name: data.supplier.name,
        s_index: data.supplier.supplierIndex,
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
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<void>((resolve, reject) => {
    const deleteRequest = store.delete(id);

    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = () => reject(deleteRequest.error);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export { addData, getData, getCertificateById, updateData, deleteData };
