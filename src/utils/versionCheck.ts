/**
 * Version checking system to detect app updates and manage service worker cache
 */

const VERSION_KEY = 'app_version';
const STORED_VERSION_KEY = 'stored_app_version';

/**
 * Get current app version from package.json or a version file
 */
export async function getCurrentVersion(): Promise<string> {
  try {
    const response = await fetch('/ocm-catalog/version.json');
    const data = await response.json();
    return data.version;
  } catch {
    // Fallback to timestamp if version.json doesn't exist
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Check if app has been updated and prompt user
 */
export async function checkForAppUpdate(): Promise<boolean> {
  const currentVersion = await getCurrentVersion();
  const storedVersion = localStorage.getItem(STORED_VERSION_KEY);

  if (storedVersion && storedVersion !== currentVersion) {
    // New version detected
    const userChoice = await promptUserForUpdate();

    if (userChoice) {
      // User chose to reload with fresh cache
      await clearAllCaches();
      localStorage.setItem(STORED_VERSION_KEY, currentVersion);
      window.location.reload();
    } else {
      // User wants to keep using old version
      localStorage.setItem(STORED_VERSION_KEY, currentVersion);
    }

    return true;
  }

  // First time or same version
  if (!storedVersion) {
    localStorage.setItem(STORED_VERSION_KEY, currentVersion);
  }

  return false;
}

/**
 * Unregister all service workers
 */
export async function unregisterServiceWorkers(): Promise<void> {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  }
}

/**
 * Clear all caches
 */
export async function clearAllCaches(): Promise<void> {
  // Unregister service workers
  await unregisterServiceWorkers();

  // Clear cache storage
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      await caches.delete(cacheName);
    }
  }

  // Clear localStorage (optional - comment out if you want to preserve user data)
  // localStorage.clear();

  // Clear sessionStorage
  sessionStorage.clear();

  // Clear IndexedDB
  await clearIndexedDB();
}

/**
 * Clear IndexedDB
 */
async function clearIndexedDB(): Promise<void> {
  return new Promise((resolve) => {
    const req = indexedDB.databases();
    req.then((databases) => {
      databases.forEach((db) => {
        if (db.name) {
          indexedDB.deleteDatabase(db.name);
        }
      });
      resolve();
    });
  });
}

/**
 * Prompt user to reload with fresh cache
 */
function promptUserForUpdate(): Promise<boolean> {
  return new Promise((resolve) => {
    const handleReload = () => {
      resolve(true);
    };

    const handleKeep = () => {
      resolve(false);
    };

    // Dispatch custom event that the UI can listen to
    window.dispatchEvent(
      new CustomEvent('app-update-available', {
        detail: { onReload: handleReload, onKeep: handleKeep },
      })
    );
  });
}
