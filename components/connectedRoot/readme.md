Responsible for collection root-level components from state, converting those components and their children into React Elements, and rendering the resulting component tree. Every component (including root components and their children) require three properties:
* **name:** hyphen-separated name of the component (could also be called a slug).
* **config:** arbitrary object of properties required for rendering the component.
* **children** array of child component configurations.