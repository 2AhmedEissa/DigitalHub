##Symptom
The application crashes when a post title is clicked.

##Root Cause
The PostDetails component attempts to access post.title and post.body while the post state is still null during the initial render,before the asynchronous fetch request completes.

##Fix
A guard was added to prevent the component from rendering until post data is available.

##Prevention
Wrapping risky components with Error Boundaries

