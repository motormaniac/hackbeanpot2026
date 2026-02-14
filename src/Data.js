function getData(key) {
    const request = window.indexedDB.open("db", 1);
    request.onsuccess = function(event) {
    }
    
    request.onerror = function(event) {
        console.error("Error opening IndexedDB:", event.target.error);
    };
}