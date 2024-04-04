// Define an interface for the shopping item
interface ShoppingItem {
    name: string;
    quantity: number;
    completed: boolean;
}

// Array to store shopping items
let shoppingList: ShoppingItem[] = [];

// Function to add an item to the shopping list
function addItem(name: string, quantity: number = 1): void {
    const newItem: ShoppingItem = {
        name,
        quantity,
        completed: false
    };
    shoppingList.push(newItem);
    console.log(`${quantity} ${name}(s) added to the shopping list.`);
}

// Function to mark an item as completed
function markCompleted(name: string): void {
    const itemIndex = shoppingList.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        shoppingList[itemIndex].completed = true;
        console.log(`${name} marked as completed.`);
    } else {
        console.log(`${name} not found in the shopping list.`);
    }
}

// Function to list all items in the shopping list
function listItems(): void {
    console.log("Shopping List:");
    shoppingList.forEach(item => {
        console.log(`${item.completed ? '[x]' : '[ ]'} ${item.quantity} ${item.name}`);
    });
}

// Add some initial items to the shopping list
addItem("Apples", 5);
addItem("Milk");
addItem("Bread", 2);

// Mark "Milk" as completed
markCompleted("Milk");

// List all items in the shopping list
listItems();
