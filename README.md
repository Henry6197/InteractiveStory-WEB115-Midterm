
3. index.html
Create an HTML file named index.html containing the following elements:
• A heading (<h1>) with your story's title.
• At least three paragraphs (<p>) with id attributes (e.g., id="paragraph1") to display story
text. Use a function to populate these with the correct text for each scene. A "Next" button
can step through an array of paragraphs when a scene has more text than fits on screen.
• Two to three buttons (<button>) with id attributes (e.g., id="north-button",
id="nextParagraphButton", id="backButton", id="submitGuessButton") to trigger story
events.
• One image (<img id="story-image">) that changes based on user interaction. Begin with a
default image (e.g., a map). Use a function that accepts a filename argument to swap the
image source.
4. style.css
Create a CSS file named style.css and link it in the <head> of your HTML. At minimum, set a
reasonable image size. Also style your buttons, paragraphs, and any other visible elements.
You may use AI for CSS only. Challenge yourself by first exploring W3Schools CSS Examples
before reaching for AI assistance.
5. script.js
Create a JavaScript file named script.js and link it just before the closing </body> tag. Implement
the following:
• Element references. Use document.getElementById() to get references to your paragraphs,
buttons, and image, and store them in variables.
• 5+ Functions: Create functions that accomplish various things in your Interactive Story. For
example, one function handles the image replacement on the page. Another function
handles the text display on the page. A third function could check whether the user has
input the correct password to open the safe.
• 1+ Loop (at least one). Example: accumulate clues in an array; clicking a "Review Clues"
button iterates the array and displays all found clues. Finding all clues unlocks the ability to
solve the murder or unlock a secret ending.
• 15+ Event listeners. Attach listeners to buttons and the document. On trigger, each listener
should accomplish tasks such as these (examples):
• Update one or more paragraph's textContent to advance the story. (Not every event
must change the image — some may only advance dialogue.)
• Change the image src when appropriate (e.g., image.src = "forest.jpg"). Keep all
referenced image files in the same directory.
• Modify at least one element's style (color, font, visibility, etc.) via CSS or inline JS.
• Open a door.
• Walk through a hallway.
• Reveal a secret hidden item.
• Attack an enemy.
• Branch the story based on a variable (e.g., if (hasKey) { ... } else { ... })
• Pick up an item and add it to a visible inventory list using appendChild
• Track health/sanity/score with a variable and update a <span> or progress bar
• Append new <p> elements to a log/journal div so history accumulates.
• Play a sound effect with new Audio("creak.mp3").play()
• Listen for a keydown event (e.g., press E to interact, arrow keys to navigate)
• Delay a story beat with setTimeout (e.g., a monster appears 3 seconds after entering a
room)
• Start a countdown timer with setInterval that forces a consequence if the player is too
slow
• The most impactful pattern to introduce is state flags — simple let variables like let
doorIsOpen = false or let inventory = [] that your listeners read and write. Once students
see that buttons can check conditions before acting, the story possibilities expand
dramatically. This is how video game save files work at a very basic level!
• Image hover. Use mouseover and mouseout listeners on the image to show a tooltip or
swap the image to display a hint. Create a <div> for the tooltip and hide it by default with
CSS.
• Keyboard input. Listen for the keydown event on the document object. Use event.key to
detect arrow keys, spacebar, or other keys and use them to reveal clues or navigate scenes.
• User text input. Include at least one moment where the player types an answer to progress.
Example: the player finds a safe with a combination lock. They search the story for the code,
return to the safe, and type the code into an input field. If the value matches the stored
combination, the safe unlocks and reveals a secret ending.
© Indiana Jones & the Great Circle. 2024, MachineGames.
6. Partner Review
Exchange your live site link with your partner and play through each other's stories. In your
presentation, document:
• The different endings you discovered.
• What you found creative or engaging.
• Any bugs or unexpected behavior.
You will present your partner's story to the class on March 25–27.
Grading Rubric
Category Criteria Points
JS Functionality (60%) At least 5 functions 10%
At least 1 for loop 10%
Code is thoroughly and
succinctly commented
10%
15+ Event listeners (clicks,
hover, keyboard) trigger
correct actions
10%
Story progresses logically;
images match each beat; 13+
unique story beats
10%
Story contains at least 3
distinct endings
5%
Implement error handling
with try-catch blocks to
prevent unexpected behavior
5%
HTML Structure (10%) Organized, well-commented
HTML
5%
Clean, readable code 5%
CSS Styling (10%) AI use
permitted.
CSS file styles elements and
improves presentation
10%
Creativity (20%) Engaging, original story (not
AI-written)
5%
Story flowchart with 13+
nodes
5%
Polished presentation of your
partner's story
10%
Bonus Opportunities
• +5 pts: Add drag-and-drop or CSS/JS animations.
• +5 pts: Use JavaScript to play sound effects or background music