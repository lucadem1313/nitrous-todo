## What we need to do


#### Frontend:
- Homepage/landing page. Should we make the homepage just be the new list page?
- Tutorial page/overlay of how it works. Think of a phone app with the intro screen
- Login/signup forms

#### Backend:
- Maybe re-doing how the backend saves lists ([See below](#how-the-backend-works-currently))
- User accounts
  - Create
  - Edit
  - Delete
  - Change passwords
  - Save
- Account verification
- Security


***

#### How the backend works currently
- When a new list is saved, the list info saves into the `lists` table. The items are saved to the `list-items` table.
- When a list is edited and the user clicks the save button, the list info is sent to the API. When the API receives info for
an already saved list, the list info gets updated, and then all the list items are deleted. Then the backend saves every item as
a new item.
- Problems:
  - Eventually we will run out of ID's
  - You have to click save
  - Probably not very efficient
  

- Fixes:
  - Ideally, I think we should just update existing items. This makes it more complicated, but is probably better.
  - So for the new system I think we should just update the info of list items with specific ID's. Then we don't have to delete and
  re-insert items, just update the ones that are changed
  - PROs:
    - No save button
    - Not as many operations to complete in the backend
