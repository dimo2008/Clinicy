/**
 * Examples.ts - TypeScript Type System and Async Functions Demo
 * This file demonstrates various TypeScript types and asynchronous patterns
 */

// ============================================================================
// 1. BASIC TYPES
// ============================================================================

function basicTypes(): void {
  const name: string = "Ahmed";
  const age: number = 33;
  const isStudent: boolean = true;
  const anything: any = "this can be anything";


  console.log(`Name: ${name}, Age: ${age}, Student: ${isStudent}, anything: ${anything}`);
}

// ============================================================================
// 2. ARRAY TYPES
// ============================================================================

function arrayTypes(): void {
  const numbers: number[] = [1, 2, 3, 4, 5];
  const strings: Array<string> = ["hello", "world"];
  const mixed: (string | number)[] = [1, "two", 3, "four"];
  const tuple: [string, number, boolean] = ["test", 42, true];

  console.log("Numbers:", numbers);
  console.log("Mixed:", mixed);
  console.log("Tuple:", tuple);
}

// ============================================================================
// 3. INTERFACES AND TYPES
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

interface Admin extends User {
  role: "admin" | "superadmin" |"Receptionist";
  permissions: string[];
}

function handleUser(user: User): void {
  console.log(`User: ${user.name} (${user.email})`);
  if (user.age) {
    console.log(`Age: ${user.age}`);
  }
}

function handleAdmin(admin: Admin): void {
  console.log(`Admin: ${admin.name}, Role: ${admin.role}`);
  console.log(`Permissions: ${admin.permissions.join(", ")}`);
}

// ============================================================================
// 4. TYPE ALIASES AND UNIONS
// ============================================================================

type ID = string | number;
type Status = "pending" | "completed" | "failed";
type Result<T> = { success: true; data: T } | { success: false; error: string };

function processID(id: ID): void {
  console.log(`Processing ID: ${id}`);
}

function updateStatus(status: Status): void {
  console.log(`Status updated to: ${status}`);
}

// ============================================================================
// 5. GENERICS
// ============================================================================

function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}
function LogUserById<T extends User>(user: T): void {
  console.log(`User ID: ${user.id}`);
}
function
 swapPair<T, U>(pair: [T, U]): [U, T] {
  return [pair[1], pair[0]];
}

interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class Box<T> implements Container<T> {
  value: T;
  private color:Color

  constructor(value: T,color:Color) {
    this.value = value;
    this.color = color;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

// ============================================================================
// 6. ENUMS
// ============================================================================

enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

function printColor(color: Color): void {
  console.log(`Selected color: ${color}`);
}

// ============================================================================
// 7. READONLY AND CONST TYPES
// ============================================================================

interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
}

type Point = {
  readonly x: number;
  readonly y: number;
};

// ============================================================================
// 8. INTERSECTION TYPES
// ============================================================================

interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

function describePerson(person: Person): void {
  console.log(`${person.name} is ${person.age} years old`);
}

// ============================================================================
// 9. ASYNCHRONOUS FUNCTIONS - PROMISES
// ============================================================================

function fetchUserData(userId: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: "John Doe",
          email: `user${userId}@example.com`,
          age: 30,
        });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 2000);
  });
}

function chaining(): void {
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

async function fetchMultipleUsers(
  userIds: number[]
): Promise<User[]> {
  const users: User[] = [];

  for (const id of userIds) {
    try {
      const user = await fetchUserData(id);
      users.push(user);
    } catch (error) {
      console.error(`Failed to fetch user ${id}`);
    }
  }

  return users;
}

async function fetchUsersParallel(userIds: number[]): Promise<User[]> {
  try {
    const promises = userIds.map((id) => fetchUserData(id));
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function demonstrateAsyncAwait(): Promise<void> {
  try {
    console.log("Fetching user...");
    const user = await fetchUserData(1);
    console.log("User fetched:", user);

    console.log("Fetching multiple users...");
    const users = await fetchUsersParallel([1, 2, 3]);
    console.log("Multiple users fetched:", users);
  } catch (error) {
    console.error("Error:", error);
  }
}

// ============================================================================
// 11. ADVANCED ASYNC PATTERNS
// ============================================================================

async function fetchWithRetry(
  userId: number,
  maxRetries: number = 3
): Promise<User> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to fetch user ${userId}`);
      return await fetchUserData(userId);
    } catch (error) {
      lastError = error as Error;
      console.log(`Attempt ${attempt} failed, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw lastError;
}

async function raceMultipleFetches(userIds: number[]): Promise<User> {
  const promises = userIds.map((id) => fetchUserData(id));
  return Promise.race(promises);
}

// ============================================================================
// 12. RESPONSE TYPES WITH GENERICS
// ============================================================================

async function apiCall<T>(
  endpoint: string
): Promise<Result<T>> {
  try {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      data: {} as T,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

// ============================================================================
// 13. FUNCTION OVERLOADING
// ============================================================================

function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return `${a}${b}`;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Invalid types");
}

// ============================================================================
// 14. CONDITIONAL TYPES
// ============================================================================

type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;

// ============================================================================
// 15. DEMO EXECUTION
// ============================================================================

export async function runExamples(): Promise<void> {
  console.log("=== TypeScript Examples ===\n");

  // Basic Types
  console.log("--- Basic Types ---");
  basicTypes();

  // Array Types
  console.log("\n--- Array Types ---");
  arrayTypes();

  // Interfaces
  console.log("\n--- Interfaces ---");
  const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  };
  handleUser(user);

  const admin: Admin = {
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

  const box = new Box(42,Color.Green);
  console.log("Box value:", box.getValue());

  // Enums
  console.log("\n--- Enums ---");
  printColor(Color.Red);
  console.log("Direction Up:", Direction.Up);

  // Intersection Types
  console.log("\n--- Intersection Types ---");
  const person: Person = { name: "Charlie", age: 35 };
  describePerson(person);

  // Async Examples
  console.log("\n--- Async/Await Examples ---");
  await demonstrateAsyncAwait();

  // Retry Logic
  console.log("\n--- Retry Logic ---");
  try {
    const userWithRetry = await fetchWithRetry(1, 2);
    console.log("User fetched with retry:", userWithRetry);
  } catch (error) {
    console.error("Failed after retries:", error);
  }

  // Function Overloading
  console.log("\n--- Function Overloading ---");
  console.log("Combine strings:", combine("Hello", " World"));
  console.log("Combine numbers:", combine(5, 10));

  console.log("\n=== All Examples Completed ===");
}
