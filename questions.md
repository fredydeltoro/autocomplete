# React Test

 1. ## What is the difference between Component and PureComponent?
  - The way that they compare new props a PureComponent make render just if there is a real chage with the new props and Component make a superficial comparation of the props
 2. ## Context + ShouldComponentUpdate might be dangerous. Can think of why is that? 
 - Well it's probably that ShouldComponentUpdate not detect a meaningful change on data and not update with the data from context  
 3. ## Describe 3 ways to pass information from a component to its PARENT
  - Passing a function to child component and pass the data as argument.  Using context, and also using a state management as redux
 4. ## Give 2 ways to prevent components from re-rendering.
  - Using ShouldComponentUpdate in a class component and using React.memo in stateless component
 5. ## What is a fragment and why do we need it?
  - Fragment is a way to return multiple elements without adding extra dom
 6. ## Give 3 examples of the HOC pattern.
    `withExtraData(Component)` 
  - could be to handle fetch data and avoid add more logic to component 
  - pass data from distant components
  - process data and just give the needed for the component
 7. ## What's the difference in handling exceptions in promises, callbacks and async/await.
  - With a promise you can handle an exception with its property cath, and with async/await and callback you need to use a try catch, but also with a callback it's probably that one of its arguments could be the error like in nodejs
 8. ## How many arguments does setState take? and why is it async?
	 - update a state could be expensive and it's probably that if would not be asynchronous the browser could be not responde. The setState accepts two arguments, the value to update or a function that updates the value, and the second argument is a callback
 9. ## List the steps needed to migrate a Class to Function Component.
	 - Change the class to a function 
	 - Remove the render method
	 - Convert all methods to functions
	 - Remove references to  _this_
	 - Remove constructor
	 - Remplace setState for useState
	 - Replace lifecycle methods with hooks
	 
10. ## List a few ways styles can be used with components
	- Use the style property
	- import a style file
	- Use css module files to related with specific className
11. ## How to render an HTML string coming from the server.
	- with dangerouslySetInnerHTML