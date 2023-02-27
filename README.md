# Codename: Café

Made with `Angular`, `RxJS`, `NgRx`, `HTML` and `SCSS`.

This app is a **Proof of Concept** on what an interactive menu would like on a mobile app. Some assumptions are made.

1. Due to the lack of a backend, several JSON files and images are already located into the `/assets` folder. We can either assume that all the necessary backend calls are made at the first moment or everytime we need any data instead, but caching it, so we don't ask for the same info several times if it hasn't changed.

2. You can refer to any restaurant `JSON` file such as `ib.json` to check for the right format for the restaurant data. Anyway, the object would be `{data: RestaurantData, menu: Category[]}`, where both types can be found in `RestaurantData.interface.ts` and `category.interface.ts` files respectively.

3. On page load, we assume that we scan with our mobile phone a QR code from a table in a restaurant that allows us to connect to the local network and redirects us to this app. That's how the table number (it's harcoded) is shown and how the restaurant knows which table is communicating with them.

4. Emojis are widely used. They are pretty convenient but they have some limitations, though. There are a couple of funny uses such as using 🍯 for depicting vegetarian food. It's not meat or fish, but it's something from animal origin lol

5. The user can ask for a waiter or place an order. If there was a backend, data would be sent to the local server to be processed. However, by clicking on both buttons nothing like this will happen :(

6. Available in English, Spanish, Catalan, French and Japanese. French and Japanese are translated using a translator, so the translations might not be faithful.

7. Disclaimer: All the info regarding the items, such as prices and allergens, are fictional.

8. I'll give you the passwords, so you don't have to look into any `JSON` file to find it 😉: `keyblade` for Codename: Code and `versus` for Ignis Bistrot.

## Restaurants

**Codename: Café**: This menu is made by me for the most part. I know I'm not the best cook in the world, but I try. There are also some cool food made by my friends :)

**Ignis Bistro**: This menu is inspired on the dishes made by Ignis, from Final Fantasy XV. All the items displayed are very good looking and I wish I'm able to cook like this someday. Food descriptions are shown like in the original game.

## Features

- Choose between different restaurants by clicking on the restaurant logo button.
- Visualize the menu.
- Visualize a single item on the menu.
- Add an item to the order, specifying quantity.
- Hide an item from the menu list in case we are sure we don't want to order it so it doesn't bother us.
- Restore hidden items to the menu.
- Request help from waiter (the button does nothing, we can imagine it does, though).
- Choose between different languages.
- Clear the order.
- Dark and Light themes.
- Show or hide allergen information from the menu.
- Filter items by its allergens.
- Only show items according to preferences such as items suitable for vegans
- Password system that allows to do cool things like displaying secret items.
- Preview the order with pictures and prices.
- Edit the order (remove items).
- Place an order (no implementation, this just clears the order).

## Future improvements

Right now, the app main requirements are fulfilled. However, there can be new features and improvements made such as the following:

- Switch button instead of a Dark Theme checkbox.
- Ability to add comments and customize ingredients from items.
- More animations
- Remove emojis and use proper icons
- Support for several images per item
