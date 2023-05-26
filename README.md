(https://grace-cinema-a6q5.onrender.com/

1️⃣Clone repo
2️⃣npm install
3️⃣createdb grace_cinema
4️⃣npm start
🆒👍🆒

If you make changes you have to:
 CTRL C to close the port
 npm run build
 then npm start)

In src/Pagination.js I made the following changes and I am documenting them for future reference over here until I have a better solution for explaining stuff.

1. I removed the for loop that was used to create an array of page numbers and replaced it with a more concise and readable way of creating the array using Array.from. This makes the code shorter and easier to understand.

2. I changed the key prop of the button elements from index to page. Using the index as a key is not recommended in React because it can cause issues with the rendering of the list if the order of the items changes. Using a unique value like the page number is a better choice for the key.

3. I replaced the == comparison operator with the strict equality operator === when checking if a page is the current page. The strict equality operator is recommended in JavaScript because it avoids type coercion and can prevent unexpected behavior.

4. I added comments throughout the code to explain what each part does and make it easier for others to understand.

In src/features/authSlice.js, I changed the code to use optional chaining (?.) to simplify error handling and reduce the number of lines of code. Additionally, the try block in the me async thunk has been moved inside the if statement to only catch errors when a token is present. I wish I knew about this method earlier instead of using nested if/ else statements.