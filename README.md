# CampusSafe Admin

CampusSafe Admin is the administrator portal for the CampusSafe system.

This project is built using **React + Vite**.

---

## Requirements

Before running the project, make sure you have installed:

- Node.js
- npm
- Git

Check if they are installed:

```bash
node -v
npm -v
git --version
```

---

## Clone the Repository

```bash
git clone https://github.com/Pansit10/CampusSafe_Admin.git
```

Go to the project folder:

```bash
cd CampusSafe_Admin
```

---

## Install Dependencies

Run:

```bash
npm install
```

---

## Run the Project

Start the development server:

```bash
npm run dev
```

Vite will display a local URL, usually:

```text
http://localhost:5173/
```

Open the URL in your browser.

---

# Git Branch Workflow

## Important Rule

Do **not** develop directly on the `main` branch.

The `main` branch should contain only stable and tested code.

For every feature, bug fix, or update:

1. Update your local `main`
2. Create a new branch
3. Make your changes
4. Test your changes
5. Commit your changes
6. Push your branch to GitHub
7. Create a Pull Request
8. Merge into `main` only after checking/testing

---

## 1. Check Your Current Branch

```bash
git branch
```

The current branch has an `*`.

Example:

```text
* main
```

You can also use:

```bash
git branch --show-current
```

---

## 2. Update Main Before Creating a Branch

Always make sure your local `main` is updated.

```bash
git checkout main
git pull origin main
```

---

## 3. Create a New Branch

Create and switch to a new branch:

```bash
git checkout -b branch-name
```

Example for a new feature:

```bash
git checkout -b feature/account-management
```

Example for a bug fix:

```bash
git checkout -b fix/login-error
```

Example for testing:

```bash
git checkout -b test/dashboard-layout
```

Check your branch:

```bash
git branch
```

Example:

```text
* feature/account-management
  main
```

---

# Recommended Branch Naming

Use descriptive branch names.

### Features

```text
feature/account-management
feature/admin-dashboard
feature/incident-report
feature/chat-system
```

### Bug Fixes

```text
fix/login-error
fix/sidebar-layout
fix/account-validation
```

### Testing

```text
test/dashboard-ui
test/account-page
```

### Other Updates

```text
chore/update-dependencies
docs/update-readme
```

---

## 4. Make Your Changes

Edit your code normally while you are inside your feature branch.

Check changed files:

```bash
git status
```

---

## 5. Add Your Changes

Add all changed files:

```bash
git add .
```

Check them:

```bash
git status
```

---

## 6. Commit Your Changes

Example:

```bash
git commit -m "Add account management page"
```

Other examples:

```bash
git commit -m "Fix sidebar navigation"
```

```bash
git commit -m "Update admin dashboard UI"
```

```bash
git commit -m "Fix login validation"
```

---

## 7. Push Your Branch

For the first push of a new branch:

```bash
git push -u origin branch-name
```

Example:

```bash
git push -u origin feature/account-management
```

After the first push, you can simply use:

```bash
git push
```

---

# Create a Pull Request

After pushing your branch:

1. Open the GitHub repository.
2. GitHub should show **Compare & pull request**.
3. Click **Compare & pull request**.
4. Make sure:

```text
base: main
compare: your-branch-name
```

Example:

```text
base: main
compare: feature/account-management
```

5. Add a title and description.
6. Click **Create Pull Request**.
7. Review and test the changes.
8. Merge the Pull Request into `main` only when everything works.

---

# After Merging

After the Pull Request has been merged, switch back to `main`:

```bash
git checkout main
```

Get the latest version:

```bash
git pull origin main
```

Delete the old local branch if it is no longer needed:

```bash
git branch -d branch-name
```

Example:

```bash
git branch -d feature/account-management
```

Then create another branch for your next task:

```bash
git checkout -b feature/new-feature
```

---

# Daily Development Workflow

A normal development workflow should look like this:

```bash
git checkout main
git pull origin main
git checkout -b feature/my-feature
```

Work on the project and test it.

Then:

```bash
git add .
git commit -m "Add my feature"
git push -u origin feature/my-feature
```

After that:

```text
Create Pull Request on GitHub
        ↓
Review / Test
        ↓
Merge into main
```

---

# Example Workflow

Suppose you want to update the Account page.

First:

```bash
git checkout main
git pull origin main
```

Create a branch:

```bash
git checkout -b feature/account-page
```

Make your changes.

Test the project:

```bash
npm run dev
```

If everything works:

```bash
git add .
git commit -m "Improve account management page"
git push -u origin feature/account-page
```

Then create a Pull Request:

```text
feature/account-page → main
```

After the Pull Request is approved and merged:

```bash
git checkout main
git pull origin main
git branch -d feature/account-page
```

---

# Important Git Rules

- Do not code directly on `main`.
- Always create a branch for new changes.
- Pull the latest `main` before creating a branch.
- Test your changes before creating a Pull Request.
- Use clear commit messages.
- Do not commit `node_modules`.
- Do not commit `.env` files.
- Merge only stable code into `main`.

---

# `.gitignore`

Make sure the project `.gitignore` contains:

```gitignore
node_modules/
dist/
.env
.env.local
```

This prevents unnecessary or sensitive files from being uploaded to GitHub.

---

# Suggested Workflow

```text
main
 │
 ├── feature/account-page
 │       ↓
 │    Development
 │       ↓
 │      Test
 │       ↓
 │   Pull Request
 │       ↓
 └────> main
```

The goal is to keep `main` stable while development and testing happen inside separate branches.