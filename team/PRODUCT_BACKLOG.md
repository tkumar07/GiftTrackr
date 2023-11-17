New stories based on MVP feedback:

Story #1 - Gift Suggestions
All users of the app will benefit from seeing potential gift suggestions
Either a) a simple chatbot in which you input the likes, dislikes, and budget, and it spits back a few suggestions, or b) a "generate suggestions" button in the cards which will automatically get data from firebase and give you suggestions
This story is valuable because even though people may know likes and dislikes of the people they are buying for, it still may be hard to decide on a single gift to buy for them. This suggestion functionality will greatly help users find gifts to give
Not too sure about how long this would take to implement, initial guess is about 2-3 days of work
Acceptance Criteria:
"Generate" suggestions button within the card
After this is pressed, a few suggestions will be displayed within the card based on likes, dislikes, and budget
Likes, Dislikes, and Budget are sent to an API (such as gpt, llama2, etc)

Story #2 - Notifications:
GIFT GIVERS will be able to get push notifications for upcoming gifts
Users will get a push notification a week before all gift giving events
Notifications are the primary way people are able to be reminded on gift giving
An estimate: around 3 days
Users will get a notification on their phone (1 week before)

Story #3: Gift Modification:
All app users who want the flexibility to modify their gift data after initially adding it to the gift list.
Enable users to easily modify their added gift data within the app, ensuring the changes are accurately reflected in the Firebase database.
This feature adds user convenience by addressing the common scenario where users need to adjust gift details due to budget constraints, time considerations, or other factors.
It takes about 2 to 4 days.
Users can successfully edit gift details post-addition. Modified data is accurately reflected in the app. The changes made by users are correctly updated in the Firebase database.

Story #4: User Story: History of Gifts Given Feature
Who It's For: All users of the app who want to keep track of the gifts they've previously given to ensure uniqueness and thoughtfulness in future gift-giving.
Desired Functionality: A feature that allows users to record and view a history of gifts they have given, including details such as the recipient's name, the occasion, the gift, and the date.
Value of the Story: This feature is valuable as it helps users avoid repeating gifts and maintains the personal touch in their gift-giving. Remembering past gifts can be challenging, and this feature simplifies this process, aiding in making more thoughtful and unique gift choices.
Work Estimate: The implementation might take approximately 4-6 hours, considering the need to design a user-friendly interface for inputting and viewing gift history and integrating this feature with the existing app data structures.
Acceptance Criteria:
1. Users can easily input and store the history of gifts given, including recipient name, occasion, gift, and date.
2. The app displays this history in an organized and easily navigable format.
3. The feature integrates seamlessly with the existing functionalities of the app, such as reminders and budget tracking.
4. The feature maintains data privacy and security standards.
5. Users can quickly access and refer to their gift history when planning new gifts.


Story #5: Marking gifts as bought:
As a thoughtful gift giver,
I want to mark whether a gift has been bought by checking a checkbox,
So that I can keep track of my gift-giving progress and differentiate gifts I have already bought and those that I have not yet bought.
This should be a short task that doesn’t require too much work, but it has two components: updating firebase to include a new attribute and being able to change the attribute on the frontend.
Acceptance Criteria:
Each gift info card in the home page has a clearly labeled checkbox, allowing the user to check or uncheck it
The checkbox is visually marked or labeled to clearly indicate that when checked, the gift has already been bought and is ready to go.
An attribute named “is_bought” is added to the gift object in Firestore, and it is a boolean type.
When a gift is added to the system, the default value of “is_bought” is set to false.
When the checkbox is checked on the home page, the corresponding “is_bought” attribute for the gift in Firestore is updated from false to true.
[Possible Addition] The system triggers reminders based on the status of the “is_bought” attribute when the occasion associated with the gift is approaching and the checkbox is still unchecked.
