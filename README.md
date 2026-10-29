# The Craft Dispatch | Newsletter Signup Modal

A responsive newsletter signup experience built with HTML5, CSS3, and Vanilla JavaScript. The project combines a clean editorial-style landing page with a delayed signup modal, email validation, dismissal controls, and a subscription confirmation screen.

## Project Overview

The Craft Dispatch is a newsletter landing page concept for publishing articles about interface design, front-end engineering, typography, and web development.

The main feature is a signup modal that appears after a short delay. Visitors can enter their email address, submit the form, or dismiss the popup and continue reading.

The project focuses on practical front-end development concepts, including timers, DOM manipulation, event handling, form validation, modal states, and responsive design.

## Features

- **Delayed Newsletter Popup:** Displays the signup modal after a configured delay.
- **Email Input and Validation:** Checks that the email field is filled in and follows a valid email format.
- **Custom Validation Feedback:** Displays a clear error message when the email address is invalid.
- **Subscription Confirmation:** Shows a success screen after a valid front-end form submission.
- **Close Button:** Allows users to dismiss the modal using the close icon.
- **Overlay Dismissal:** Allows users to close the popup by clicking outside the modal.
- **Dismissal Option:** Includes a "No thanks, maybe later" control.
- **Continue Reading:** Lets visitors return to the landing page after the confirmation screen.
- **Multiple Signup Entry Points:** Visitors can open the signup modal using the Subscribe buttons on the page.
- **Responsive Layout:** Adapts the content and modal to mobile, tablet, and desktop screens.
- **Editorial Landing Page:** Includes a featured essay, recent dispatches, category filters, and newsletter-focused content.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structures the landing page, modal, email form, and content sections. |
| CSS3 | Handles typography, layout, colours, responsive styling, modal positioning, overlay effects, and visual states. |
| Vanilla JavaScript | Controls the popup timer, form validation, event listeners, modal visibility, and confirmation state. |

No front-end framework is required.

## How the Application Works

### 1. Page Initialization

When the page loads, JavaScript initializes the modal and its related controls. The signup modal remains hidden until the configured display conditions are met.

### 2. Delayed Modal Display

JavaScript uses `setTimeout()` to schedule the popup after a specified delay.

The callback checks the relevant dismissal state before displaying the modal. This avoids showing the popup immediately when the page first loads.

### 3. Opening the Modal

The Subscribe buttons provide an additional way to open the signup modal manually. This gives visitors control over when they want to subscribe instead of forcing them to wait for the timer.

### 4. Email Validation

The email field uses HTML form validation, including `type="email"` and `required`, to reject empty or incorrectly formatted input.

JavaScript handles the form's `submit` event to control the front-end submission flow. Invalid input receives visible feedback, allowing the user to correct the address.

### 5. Handling Form Submission

When a valid email address is submitted:

1. The form submission is handled by JavaScript.
2. The browser's default page reload is prevented when the form is being handled locally.
3. The entered email address is read from the form.
4. The interface switches to the subscription confirmation state.
5. The user sees a success message and a Continue Reading button.

**Important:** This is a front-end demonstration. The confirmation screen does not mean that the email address has been stored or added to a real mailing list.

### 6. Closing the Modal

The modal can be dismissed using the close icon, the "No thanks, maybe later" option, or the overlay.

The event handlers distinguish clicks inside the modal from clicks on the backdrop so that interacting with the form does not accidentally close the popup.

### 7. Preventing Repeated Popups

A dismissal flag or browser storage can be used to prevent the modal from repeatedly appearing after a visitor closes it.

The exact persistence depends on the implementation:

- A JavaScript variable generally lasts only while the current page remains loaded.
- `sessionStorage` can preserve the dismissal state for the current browser tab session.
- `localStorage` can preserve the state across browser sessions until it is cleared.

The chosen storage method determines when the popup is allowed to appear again.

### 8. Continuing to Read

After successful form submission, the confirmation screen provides a Continue Reading button. This returns the visitor to the landing page without requiring a page reload.

## JavaScript Concepts Used

### `setTimeout()`

Schedules a function to run after a specified delay. It is used to control when the newsletter popup appears.

### DOM Manipulation

JavaScript selects page elements and updates their visibility, text content, classes, and interface state.

### Event Listeners

Events such as `click`, `submit`, and `DOMContentLoaded` allow the application to respond to user actions and page initialization.

### Form Validation

HTML validation attributes and JavaScript work together to prevent invalid email input from reaching the success state.

### `event.preventDefault()`

Prevents the browser's default form submission behaviour when JavaScript is handling the front-end interaction.

### Conditional Logic

Conditional statements determine whether the modal should open, whether an email is valid, and which interface state should be displayed.

### State Management

The application tracks states such as the modal being open, the modal being dismissed, and the form submission being successful. Keeping these states separate helps avoid conflicting UI behaviour.

### Browser Storage (If Implemented)

`sessionStorage` or `localStorage` can remember the dismissal state. Browser storage should only be described as part of the implementation if it is actually used in the project.

## Project Structure

The project can be organized into the following files:

```text
Newsletter-Signup-Modal-Day-20/
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html`: Contains the landing page, modal markup, email form, featured essay, and newsletter sections.
- `style.css`: Defines the visual design, responsive layout, modal overlay, form states, and confirmation screen.
- `script.js`: Handles the popup timer, modal controls, email validation, form submission, and UI state transitions.
- `README.md`: Documents the project, its functionality, and implementation details.

The exact filenames should match the files in the repository.

## How to Run Locally

1. Clone or download the project repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser or use the Live Server extension.
4. Wait for the newsletter popup to appear.
5. Test the email field, submission flow, dismissal controls, and responsive layout.

No package installation is necessary for a standard HTML, CSS, and JavaScript implementation.

## Testing Checklist

- [ ] The landing page loads without JavaScript errors.
- [ ] The signup modal appears after the configured delay.
- [ ] The Subscribe buttons open the modal.
- [ ] An empty email address is rejected.
- [ ] An incorrectly formatted email address displays validation feedback.
- [ ] A valid email address opens the confirmation state.
- [ ] The page does not reload unexpectedly during local form handling.
- [ ] The close icon dismisses the modal.
- [ ] Clicking the overlay dismisses the modal.
- [ ] Clicking inside the modal does not accidentally trigger overlay dismissal.
- [ ] The "No thanks, maybe later" control works.
- [ ] Continue Reading returns the visitor to the landing page.
- [ ] The popup dismissal behaviour matches the selected state or storage implementation.
- [ ] The modal remains usable on smaller screens.
- [ ] Keyboard users can navigate and submit the form.

## Current Limitations

- The project does not automatically add email addresses to a mailing list.
- There is no backend API or database connected to the form.
- The success screen represents a successful front-end interaction, not a verified newsletter subscription.
- Client-side email validation checks formatting but cannot verify that an inbox exists or belongs to the visitor.
- Popup persistence depends on the storage mechanism used in the implementation.

## Future Improvements

- Integrate a newsletter provider or backend API to process real subscriptions.
- Store email addresses securely with appropriate consent and privacy controls.
- Add server-side validation and duplicate-subscription handling.
- Display loading, success, and server-error states based on actual API responses.
- Add automated tests for modal behaviour and form validation.
- Improve accessibility with focus management, Escape-key dismissal, and appropriate dialog semantics.
- Allow the popup delay and display frequency to be configured.
- Add a clear privacy notice explaining how submitted email addresses will be used.

## Learning Outcomes

Through this project, I practised:

- Working with JavaScript timers.
- Managing modal visibility and UI states.
- Handling click and submit events.
- Validating user input with HTML and JavaScript.
- Updating the DOM based on user interactions.
- Building responsive layouts for mobile and desktop.
- Designing clear success and error feedback.
- Understanding the difference between front-end form handling and a real backend subscription workflow.

## Author

**Aditya Singh**  
B.Tech, Computer Science and Engineering

## Project Links

- **Live Demo:** Add your deployed website URL here.
- **GitHub Repository:** Add your repository URL here.

## License

This project is intended for learning and portfolio demonstration. Add a license file if you plan to distribute the project under specific licensing terms.
