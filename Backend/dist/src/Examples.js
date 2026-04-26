/**
 * Examples.ts - TypeScript Type System and Async Functions Demo
 * This file demonstrates various TypeScript types and asynchronous patterns
 */
// ============================================================================
// 1. BASIC TYPES
// ============================================================================
function basicTypes() {
    const name = "Ahmed";
    const age = 33;
    const isStudent = true;
    const anything = "this can be anything";
    console.log(`Name: ${name}, Age: ${age}, Student: ${isStudent}, anything: ${anything}`);
}
// ============================================================================
// 2. ARRAY TYPES
// ============================================================================
function arrayTypes() {
    const numbers = [1, 2, 3, 4, 5];
    const strings = ["hello", "world"];
    const mixed = [1, "two", 3, "four"];
    const tuple = ["test", 42, true];
    console.log("Numbers:", numbers);
    console.log("Mixed:", mixed);
    console.log("Tuple:", tuple);
}
function handleUser(user) {
    console.log(`User: ${user.name} (${user.email})`);
    if (user.age) {
        console.log(`Age: ${user.age}`);
    }
}
function handleAdmin(admin) {
    console.log(`Admin: ${admin.name}, Role: ${admin.role}`);
    console.log(`Permissions: ${admin.permissions.join(", ")}`);
}
function processID(id) {
    console.log(`Processing ID: ${id}`);
}
function updateStatus(status) {
    console.log(`Status updated to: ${status}`);
}
// ============================================================================
// 5. GENERICS
// ============================================================================
function getFirstElement(array) {
    return array[0];
}
function LogUserById(user) {
    console.log(`User ID: ${user.id}`);
}
function swapPair(pair) {
    return [pair[1], pair[0]];
}
class Box {
    value;
    color;
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
}
// ============================================================================
// 6. ENUMS
// ============================================================================
var Color;
(function (Color) {
    Color["Red"] = "RED";
    Color["Green"] = "GREEN";
    Color["Blue"] = "BLUE";
})(Color || (Color = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
function printColor(color) {
    console.log(`Selected color: ${color}`);
}
function describePerson(person) {
    console.log(`${person.name} is ${person.age} years old`);
}
// ============================================================================
// 9. ASYNCHRONOUS FUNCTIONS - PROMISES
// ============================================================================
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "John Doe",
                    email: `user${userId}@example.com`,
                    age: 30,
                });
            }
            else {
                reject(new Error("Invalid user ID"));
            }
        }, 2000);
    });
}
function chaining() {
    fetchUserData(1)
        .then((user) => {
        console.log("User fetched:", user);
        return user.id;
    })
        .then((id) => {
        console.log("User ID:", id);
    })
        .catch((error) => {
        console.error("Error:", error.message);
    });
}
// ============================================================================
// 10. ASYNC/AWAIT FUNCTIONS
// ============================================================================
async function fetchMultipleUsers(userIds) {
    const users = [];
    for (const id of userIds) {
        try {
            const user = await fetchUserData(id);
            users.push(user);
        }
        catch (error) {
            console.error(`Failed to fetch user ${id}`);
        }
    }
    return users;
}
async function fetchUsersParallel(userIds) {
    try {
        const promises = userIds.map((id) => fetchUserData(id));
        const users = await Promise.all(promises);
        return users;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
async function demonstrateAsyncAwait() {
    try {
        console.log("Fetching user...");
        const user = await fetchUserData(1);
        console.log("User fetched:", user);
        console.log("Fetching multiple users...");
        const users = await fetchUsersParallel([1, 2, 3]);
        console.log("Multiple users fetched:", users);
    }
    catch (error) {
        console.error("Error:", error);
    }
}
// ============================================================================
// 11. ADVANCED ASYNC PATTERNS
// ============================================================================
async function fetchWithRetry(userId, maxRetries = 3) {
    let lastError = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} to fetch user ${userId}`);
            return await fetchUserData(userId);
        }
        catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt} failed, retrying...`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
    throw lastError;
}
async function raceMultipleFetches(userIds) {
    const promises = userIds.map((id) => fetchUserData(id));
    return Promise.race(promises);
}
// ============================================================================
// 12. RESPONSE TYPES WITH GENERICS
// ============================================================================
async function apiCall(endpoint) {
    try {
        // Simulating an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            success: true,
            data: {},
        };
    }
    catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}
function combine(a, b) {
    if (typeof a === "string" && typeof b === "string") {
        return `${a}${b}`;
    }
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    throw new Error("Invalid types");
}
// ============================================================================
// 15. DEMO EXECUTION
// ============================================================================
export async function runExamples() {
    console.log("=== TypeScript Examples ===\n");
    // Basic Types
    console.log("--- Basic Types ---");
    basicTypes();
    // Array Types
    console.log("\n--- Array Types ---");
    arrayTypes();
    // Interfaces
    console.log("\n--- Interfaces ---");
    const user = {
        id: 1,
        name: "Alice",
        email: "alice@example.com"
    };
    handleUser(user);
    const admin = {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        role: "admin",
        permissions: ["read", "write", "delete"],
    };
    handleAdmin(admin);
    // Type Aliases
    console.log("\n--- Type Aliases ---");
    processID(123);
    processID("ABC-789");
    updateStatus("pending");
    // Generics
    console.log("\n--- Generics ---");
    const firstNum = getFirstElement([1, 2, 3]);
    console.log("First element:", firstNum);
    const swapped = swapPair([5, "ten"]);
    console.log("Swapped pair:", swapped);
    const box = new Box(42, Color.Green);
    console.log("Box value:", box.getValue());
    // Enums
    console.log("\n--- Enums ---");
    printColor(Color.Red);
    console.log("Direction Up:", Direction.Up);
    // Intersection Types
    console.log("\n--- Intersection Types ---");
    const person = { name: "Charlie", age: 35 };
    describePerson(person);
    // Async Examples
    console.log("\n--- Async/Await Examples ---");
    await demonstrateAsyncAwait();
    // Retry Logic
    console.log("\n--- Retry Logic ---");
    try {
        const userWithRetry = await fetchWithRetry(1, 2);
        console.log("User fetched with retry:", userWithRetry);
    }
    catch (error) {
        console.error("Failed after retries:", error);
    }
    // Function Overloading
    console.log("\n--- Function Overloading ---");
    console.log("Combine strings:", combine("Hello", " World"));
    console.log("Combine numbers:", combine(5, 10));
    console.log("\n=== All Examples Completed ===");
}
//# sourceMappingURL=Examples.js.map