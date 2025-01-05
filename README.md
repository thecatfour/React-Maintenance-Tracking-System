# React-Maintenance-Tracking-System
This is a submission to the [React Coding Challenge](https://gist.github.com/TheCodingCanal/e991fcdcd2be75c3a2676fd425173c02) from TheCodingCanal. The app is a simple maintenance tracking system that allows technicians to log maintenance activities on equipment and visualize basic maintenance metrics. The app was built using Next.js and React.

## Setup Instructions

### Prerequisites
The app was developed using the following:
```bash
Node.js v20.18.0
```

### Installation steps
1. Confirm you have Node.js to build and run the app. Run the following command in a terminal to ensure that node is installed. (Actual output may vary)
```bash
$ node -v
v20.18.0
```
2. Clone or fork the project and step into the directory *React-Maintenance-Tracking-System/maintenance-tracking-system/* with the following command.
```bash
$ cd maintenance-tracking-system
```
3. Install the frontend packages with the following command.
```bash
$ npm install
```
4. Once the install is finished, you should be able to run the app.

### How to run the application
1. After completing installation, you should first run the following command to start the development environment. You need to be in the *maintenance-tracking-system/* directory for this to run.
```bash
$ cd .../React-Maintenance-Tracking-System/maintenance-tracking-system 
$ npm run dev
```
2. Once the server is running, you can use localhost:3000 to connect to the frontend. A link to the frontend should be provided by the terminal in the following format.
```bash
Next.js 15.1.2
- Local:		http://localhost:3000
- Network:		http://(Local IP address):3000
```

### How to run tests
1. Make sure that the server is running.
```bash
$ npm run dev
```
2. Make sure playwright has all its testing browsers installed.
```bash
$ npx playwright install
```
3. Run the tests.
```bash
$ npx playwright test
```
4. You can also use the following command to open a UI to oversee tests.
```bash
$ npx playwright test --ui
```

## Features Implementation

### List of completed features
1. Equipment object
2. Maintenance Record object
3. Equipment Forms
	- Validation using zod
	- Create one equipment
	- Edit one equipment
	- Edit multiple equipment status
4. Maintenance Record Forms
	- Validation using zod
	- Create one record
	- Edit one record
5. Equipment Table
	- Sort and filter by any column
	- Row coloring based on status
	- Bulk status updates
6. Maintenance Records Table
	- Sort and filter by any column
	- Row coloring based on status
	- Includes equipment name for the equipment that the record is about
	- Group by equipment name/id
7. Dashboard
	- Equipment status pie chart
	- Maintenance hours bar chart
	- Maintenance records within one week of today
8. Required Tests
	- Tests for equipment
	- Tests for maintenance records

## Testing Approach

### Testing strategy
Unit tests are used on several components such as the forms or the filter components on the tables. They were implemented using Playwright and are located in the tests/ directory.
- equipment-management.spec.ts contains tests for equipment.
- maintenance-records-management.spec.ts constains tests for maintenance records.

The *src/lib/playwright-helpers/* directory contains helper functions necessary for both test files including:
- Creating an equipment or record
- Checking an equipment or record in the table

### What is tested and why
Equipment tests include:
- equipment creation to check that an equipment can be created by a user
- validation errors for equipment to check that a user is given error messages on invalid data
- editing equipment to check that a user's changes will be reflected in the object displayed
- filter equipment table to check that the filters are working correctly

Maintenance record tests include:
- maintenance record creation to check that a record can be created by the user
- validation errors for maintenance hours to check that the input is in a valid range
- show equipment name in maintenance table to make sure the join between arrays is correct
- filter maintenance records by date range to make sure the user can check specific ranges of dates

### How to run different types of tests
In order to run all tests, the following command can be used:
```bash
$ npx playwright test
```
In order to run specific tests, the following command can be used:
```bash
$ npx playwright test [name of test file]
```
Additionally, using the ui playwright testing window, you can run individual tests easily.
```bash
$ npx playwright test --ui
```

## Technical Decisions

### Key libraries used and why
Tanstack Table
- Provides framework for creating a table component
- Includes functions such as filtering, selecting, and sorting rows
- Used for equipment and maintenance records tables

Recharts
- Provides framework for creating graphs and charts
- Used for equipment status pie chart and maintenance hours bar chart

Zod
- Provides form validation functionality
- Used for creation/editing of equipment and maintenance records

Playwright
- Provides testing for frontend components such as the tables or forms

React-hook-form
- Provides functions and components to help make reusable input components
- Used in all forms and several input components in the *generics/input/* directory

Clsx
- Provides an easy way to understand dynamic classname assignment
- Used to select row colors based on status

### Architecture decisions
The code for the app is organized into three main directories in the *src/* file.
1. **app:** contains the pages that are displayed to users.
2. **components:** contains the components that are reused and rendered on pages.
3. **lib:** contains other helper functions and files that do not have tsx elements.

The *components/* and *lib/* directory contain a structure similar to the following:
```
components/
   equipment/
      buttons/
         EquipmentCreateButton.tsx
      forms/
         EquipmentFullForm.tsx
      visuals/
         EquipmentTable.tsx
   generics/
   maintenance-records/
```
Basically, the files are stored in directories that function as categories to generalize their functions.
The *generics/* directory contains elements that can be reused in other components such as a modal or custom input.

### State management approach
Multiple hooks are used in the home page file to contain all necessary information. These are used to maintain equipment and maintenance records accross the different components. Since there is no backend to store information, a simple navbar is used to change the components that are rendered on the page. This allows the arrays of equipment and maintenance records to persist when switching between different components.

Dispatch functions are passed to components to allow them to change the arrays.

## Known Issues/Limitations

### Current bugs or limitations
Bugs:
- The create random equipment/maintenance records function can sometimes create dates in the future
- When clicking a checkbox for a group of maintenance records, sometimes the rows would not be selected. Therefore, there is currently no select group function for the maintenance records table
- The date filters can sometimes show a date out of the intended range 

Limitations:
- Since there is no backend, all the arrays are kept on the home page, which means larger datasets result in high memory use
- The dynamic array for parts replaced is directly in the form rather than abstracted to its own component
- After modifying rows in a table, all selected rows are deselected

### Future improvements
Tables:
- Pagination should be implemented to make sure only some rows rather than all rows are rendered on the page
- The groups in the maintenance table should be capable of being selected

Enum vs Union of strings:
- Enums could be used rather than unions of strings for some of the fields in the interfaces

Forms:
- Add an API call to connect the frontend to the backend (if implemented)
- Abstract the dynamic array to its own component

Tests:
- Add tests for all the components that a user would use such as
	- Editing a maintenance record
	- Check all error messages for invalid data in maintenance record forms
	- Check that grouping works as intended
- Possibly split some tests into multiple different tests
	- The equipment validation test checks all inputs. It might be smarter to check all name inputs in one test and all date inputs in another
