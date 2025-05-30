# Kahit Saan - User Manual

## Introduction

Welcome to Kahit Saan! This manual will guide you through using the Kahit Saan application, covering both the customer-facing website and the admin panel.

**Deployed URLs:**
*   **Main Website:** [https://kahit-saan-client.onrender.com](https://kahit-saan-client.onrender.com)
*   **Admin Panel:** Access through a link on the main website (typically in the footer) or directly if you have the URL.



## 1. Using the Kahit Saan Website (For Customers)

The main website allows you to browse the restaurant's menu and find information about Kahit Saan.

### 1.1. Navigation
The website has a simple navigation bar at the top with the following sections:
*   **MENU:** Displays all available food and drink items.
*   **ABOUT:** Provides information about the restaurant's story and concept.
*   **LOCATION:** Shows the restaurant's physical address and a map.
*   **CONTACT:** Lists ways to get in touch with the restaurant and links to social media.

### 1.2. Viewing the Menu
*   Click on the "MENU" link in the navigation bar or scroll down to the menu section.
*   Each menu item displays:
    *   An image of the dish.
    *   The name of the dish.
    *   A brief description.
    *   The price.

### 1.3. Finding Location and Contact Information
*   Scroll to the "LOCATION" section to see the address and an embedded Google Map.
*   The "CONTACT" section provides phone numbers, email addresses, and links to social media pages.

## 2. Admin Panel Usage

The Admin Panel is used by restaurant staff to manage menu items and administrator accounts.

### 2.1. Accessing the Admin Panel
1.  Navigate to the main Kahit Saan website: [https://kahit-saan-client.onrender.com](https://kahit-saan-client.onrender.com)
2.  Scroll to the bottom of the page (footer).
3.  Click on the "Admin Login" (or similar) link. This will take you to the Admin Login page.

### 2.2. Logging In
*   On the Admin Login page, enter your credentials:
    *   **Email:** Your registered admin email address.
    *   **Password:** Your admin password.
*   Click the "Login" button.

**Test Account:**
*   **Username/Email:** `admin1`
*   **Password:** `password123`

    *(Note: For security, it is highly recommended to change this default password immediately after your first login if this is a live or shared environment.)*

### 2.3. Admin Dashboard Overview
After logging in, you will be directed to the admin dashboard, which typically includes a sidebar for navigation:

*   **Menu Management:** For managing food and drink items.
*   **User Management:** For managing admin accounts.
*   **Logout:** To securely log out of the admin panel.

### 2.4. Menu Management

This section allows you to add, view, edit, and delete menu items.

#### 2.4.1. Viewing Menu Items
*   Navigate to "Menu Management" from the sidebar.
*   You will see a list or grid of all current menu items, displaying their name, description, price, and image.

#### 2.4.2. Adding a New Menu Item
1.  In the "Menu Management" section, look for an "Add New Item" or "+" button.
2.  A form or modal will appear. Fill in the following details:
    *   **Name:** The name of the menu item (e.g., "Laksa Noodles").
    *   **Description:** A short description of the item.
    *   **Price:** The price of the item (e.g., 170.00).
    *   **Category:** (If applicable) Select a category for the item (e.g., "Main Course", "Drinks").
    *   **Photo:** Upload an image for the menu item. Click the "Choose File" or "Upload Image" button and select an image from your computer.
3.  Click "Save" or "Add Item".

#### 2.4.3. Editing an Existing Menu Item
1.  In the "Menu Management" section, find the item you wish to edit.
2.  Click the "Edit" button (often an icon like a pencil) associated with that item.
3.  A form or modal will appear pre-filled with the item's current details.
4.  Modify the details as needed (name, description, price, category, photo).
5.  Click "Save" or "Update Item".

#### 2.4.4. Deleting a Menu Item
1.  In the "Menu Management" section, find the item you wish to delete.
2.  Click the "Delete" button (often an icon like a trash can) associated with that item.
3.  A confirmation prompt will appear. Confirm that you want to delete the item.
    *   **Caution:** Deleting an item is usually permanent.

### 2.5. User Management (Admin Accounts)

This section allows you to add, view, edit, and delete administrator accounts.

#### 2.5.1. Viewing Users
*   Navigate to "User Management" from the sidebar.
*   You will see a list of all registered admin users, typically showing their username/email and role.

#### 2.5.2. Adding a New User
1.  In the "User Management" section, look for an "Add New User" or "+" button.
2.  A form or modal will appear. Fill in the following details:
    *   **Username/Email:** The email address for the new admin user.
    *   **Password:** A strong password for the new user.
    *   **Role:** (If applicable) Assign a role (e.g., "Admin", "Staff").
3.  Click "Save" or "Add User".

#### 2.5.3. Editing an Existing User
1.  In the "User Management" section, find the user you wish to edit.
2.  Click the "Edit" button associated with that user.
3.  A form or modal will appear. You can typically update the username/email and role. For security reasons, changing passwords might require a separate "Change Password" function or re-entering the old password.
4.  Modify the details as needed.
5.  Click "Save" or "Update User".

#### 2.5.4. Deleting a User
1.  In the "User Management" section, find the user you wish to delete.
2.  Click the "Delete" button associated with that user.
3.  A confirmation prompt will appear. Confirm that you want to delete the user.
    *   **Caution:** Ensure you are not deleting the last admin account, as this could lock you out of the system.

### 2.6. Logging Out
*   Click the "Logout" button in the admin sidebar.
*   You will be redirected to the Admin Login page or the main website.

## 3. Troubleshooting & Support

*   **Login Issues:**
    *   Ensure you are using the correct email and password.
    *   Check if your Caps Lock key is on/off.
    *   If you forgot your password, there might be a "Forgot Password" link (if implemented) or you may need to contact a super-administrator.
*   **Image Upload Failures:**
    *   Ensure the image file is in a supported format (e.g., JPG, PNG, WEBP).
    *   Check the file size; there might be a limit.
*   **Changes Not Appearing:**
    *   Try clearing your browser cache or doing a hard refresh (Ctrl+Shift+R or Cmd+Shift+R).
    *   Ensure your internet connection is stable.

If you encounter persistent issues, please refer to the technical documentation or contact the application developer.

---
*This User Manual was last updated on May 30, 2025.*
