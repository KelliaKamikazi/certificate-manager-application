import { Certificate, Supplier, Participant } from '../components/data/data';
const DB_NAME = 'exampleDB';
const DB_VERSION = 1;
const STORE_CERTIFICATES = 'certificates';
const STORE_SUPPLIERS = 'suppliers';
const STORE_PARTICIPANTS = 'participants';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create stores if they don't exist
      if (!db.objectStoreNames.contains(STORE_CERTIFICATES)) {
        db.createObjectStore(STORE_CERTIFICATES, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(STORE_SUPPLIERS)) {
        db.createObjectStore(STORE_SUPPLIERS, {
          keyPath: 'supplierIndex',
          autoIncrement: false,
        });
      }

      if (!db.objectStoreNames.contains(STORE_PARTICIPANTS)) {
        db.createObjectStore(STORE_PARTICIPANTS, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      const db = request.result;

      // Function to check if a store is empty
      const isStoreEmpty = (storeName: string): Promise<boolean> => {
        return new Promise((resolve) => {
          const transaction = db.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const countRequest = store.count();
          countRequest.onsuccess = () => {
            resolve(countRequest.result === 0);
          };
        });
      };

      // Function to populate a store if it's empty
      const populateStoreIfEmpty = async (storeName: string, data: any[]) => {
        if (await isStoreEmpty(storeName)) {
          const transaction = db.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          data.forEach((item) => {
            store.add(item);
          });
          return new Promise<void>((resolve, reject) => {
            transaction.oncomplete = () => {
              console.log(`${storeName} populated successfully`);
              resolve();
            };
            transaction.onerror = (e) => {
              console.error(`Error populating ${storeName}:`, e);
              reject(e);
            };
          });
        }
      };

      // Initial data
      const suppliers: Supplier[] = [
        { supplierIndex: 1, name: 'ANDEMIS GmbH', city: 'Stuttgart' },
        { supplierIndex: 2, name: 'IMLER AG', city: 'Berlin' },
      ];

      const participants = [
        {
          userId: 'ZWOLFER',
          name: 'Simon',
          firstname: 'Zwölfer',
          department: 'ITM/FP',
          plant: '096',
          email: 'simon@example.com',
        },
        {
          userId: 'WOLFGANG',
          name: 'Wolfgang',
          firstname: 'Stark',
          department: 'ITM/FP',
          plant: '094',
          email: 'wolfgang@example.com',
        },
      ];

      // Populate stores if they're empty
      Promise.all([
        populateStoreIfEmpty(STORE_SUPPLIERS, suppliers),
        populateStoreIfEmpty(STORE_PARTICIPANTS, participants),
      ])
        .then(() => {
          resolve(db);
        })
        .catch((error) => {
          console.error('Error during population:', error);
          reject(error);
        });
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
  supplierIndex: number | undefined,
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

const fetchParticipants = async (): Promise<Participant[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PARTICIPANTS, 'readonly');
  const store = transaction.objectStore(STORE_PARTICIPANTS);

  return new Promise((resolve, reject) => {
    const participants: Participant[] = [];

    // Using cursor to iterate over all records
    const request = store.openCursor();

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
      if (cursor) {
        participants.push(cursor.value);
        cursor.continue();
      } else {
        resolve(participants);
      }
    };

    request.onerror = (event) => {
      reject(
        new Error(
          `Error fetching participants: ${(event.target as IDBRequest).error}`,
        ),
      );
    };
  });
};

const searchParticipant = async (
  name: string,
  firstname: string,
  department: string,
  plant: string,
  email: string,
): Promise<Participant[]> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_PARTICIPANTS, 'readonly');
  const store = transaction.objectStore(STORE_PARTICIPANTS);

  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const result = request.result.filter((participant: Participant) => {
        return (
          (!name ||
            participant.name.toLowerCase().includes(name.toLowerCase())) &&
          (!firstname ||
            participant.firstname
              .toLowerCase()
              .includes(firstname.toLowerCase())) &&
          (!department ||
            participant.department
              .toLowerCase()
              .includes(department.toLowerCase())) &&
          (!plant || participant.plant === plant) &&
          (!email ||
            participant.email.toLowerCase().includes(email.toLowerCase()))
        );
      });
      resolve(result);
    };

    request.onerror = () => reject(request.error);
  });
};

export {
  initDB,
  addData,
  getData,
  getCertificateById,
  updateData,
  deleteData,
  fetchParticipants,
  searchParticipant,
};
