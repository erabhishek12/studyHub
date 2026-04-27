/* ============================================================
   StudyHub Quiz Module — quiz.js
   Single shared JS | Version 1.0.0
   Author: Abhishek (Er. Abhishek) | https://erabhi.in/studyHub/
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────
   QUESTION BANKS
   ─────────────────────────────────────────────────────────── */

const QUESTION_BANKS = {

  /* ── DSA ────────────────────────────────────────────────── */
  dsa: [
    {
      id: 1,
      question: "Which data structure uses the LIFO (Last In First Out) principle?",
      example: "Think of a stack of plates — you add and remove from the top.",
      options: ["Queue", "Stack", "Array", "Tree"],
      correctIndex: 1,
      explanation: "A Stack follows LIFO — the last element inserted is the first one to be removed, like a stack of plates."
    },
    {
      id: 2,
      question: "What is the time complexity of binary search on a sorted array?",
      example: "Searching in a sorted array of 1,000 elements takes only ~10 steps.",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctIndex: 1,
      explanation: "Binary search halves the search space each step, giving O(log n) time complexity."
    },
    {
      id: 3,
      question: "Which data structure uses the FIFO (First In First Out) principle?",
      example: "Like a queue of people at a ticket counter — first come, first served.",
      options: ["Stack", "Graph", "Queue", "Heap"],
      correctIndex: 2,
      explanation: "A Queue follows FIFO — elements are added at the rear and removed from the front."
    },
    {
      id: 4,
      question: "What is the worst-case time complexity of QuickSort?",
      example: "Happens when the pivot is always the smallest or largest element.",
      options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
      correctIndex: 2,
      explanation: "QuickSort's worst case is O(n²) when the pivot selection is poor (already sorted array with bad pivot)."
    },
    {
      id: 5,
      question: "In a Binary Search Tree (BST), which traversal visits nodes in sorted order?",
      example: "For a BST with values 4, 2, 6, 1, 3 — the sorted output is 1, 2, 3, 4, 6.",
      options: ["Pre-order", "Post-order", "In-order", "Level-order"],
      correctIndex: 2,
      explanation: "In-order traversal (Left → Root → Right) of a BST always produces a sorted sequence."
    },
    {
      id: 6,
      question: "What is the space complexity of Merge Sort?",
      example: "Unlike QuickSort, Merge Sort needs extra memory to merge halves.",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctIndex: 2,
      explanation: "Merge Sort requires O(n) auxiliary space to hold the temporary merged arrays."
    },
    {
      id: 7,
      question: "Which algorithm is used to find the shortest path in an unweighted graph?",
      example: "Finding the minimum number of friend hops between two people in a social network.",
      options: ["Dijkstra's", "BFS", "DFS", "Bellman-Ford"],
      correctIndex: 1,
      explanation: "BFS (Breadth-First Search) guarantees the shortest path in terms of number of edges in an unweighted graph."
    },
    {
      id: 8,
      question: "What does a Hash Table provide for average case search operations?",
      example: "Looking up a contact name in your phone — nearly instantaneous.",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctIndex: 3,
      explanation: "Hash Tables provide O(1) average case for search, insert, and delete using a hash function."
    },
    {
      id: 9,
      question: "Which data structure is best suited for implementing a recursive function call mechanism?",
      example: "When factorial(5) calls factorial(4), each call waits for the next to return.",
      options: ["Queue", "Stack", "Linked List", "Array"],
      correctIndex: 1,
      explanation: "The call stack used in recursion follows LIFO — a Stack is the underlying structure."
    },
    {
      id: 10,
      question: "What is the Big-O notation for accessing an element in an array by index?",
      example: "Getting the 500th element of an array is as fast as getting the 1st.",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctIndex: 2,
      explanation: "Array access by index is O(1) — constant time, regardless of the array size."
    },
    {
      id: 11,
      question: "Which sorting algorithm has the best average-case performance with O(n log n)?",
      example: "Used internally by JavaScript's Array.sort() and Java's Arrays.sort().",
      options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
      correctIndex: 3,
      explanation: "Merge Sort consistently achieves O(n log n) in all cases — best, worst, and average."
    },
    {
      id: 12,
      question: "In a singly linked list, what is the time complexity of inserting at the head?",
      example: "Adding a new first node simply requires updating one pointer.",
      options: ["O(n)", "O(n log n)", "O(1)", "O(log n)"],
      correctIndex: 2,
      explanation: "Inserting at the head of a linked list is O(1) — just update the head pointer to the new node."
    },
    {
      id: 13,
      question: "What is a Min-Heap?",
      example: "A priority queue where the emergency patient (highest priority = lowest number) is always served first.",
      options: [
        "A heap where the largest element is at the root",
        "A heap where the smallest element is at the root",
        "A heap with only two levels",
        "A sorted array representation"
      ],
      correctIndex: 1,
      explanation: "In a Min-Heap, every parent node is smaller than or equal to its children, so the minimum is always at the root."
    },
    {
      id: 14,
      question: "Which graph traversal algorithm uses a queue internally?",
      example: "Exploring a maze level by level — first all neighbors, then their neighbors.",
      options: ["DFS", "BFS", "Dijkstra's", "Prim's"],
      correctIndex: 1,
      explanation: "BFS uses a queue to explore nodes level by level — FIFO ensures breadth-first exploration."
    },
    {
      id: 15,
      question: "What is Dynamic Programming primarily used for?",
      example: "Fibonacci: instead of recalculating fib(3) multiple times, store it and reuse.",
      options: [
        "Sorting large datasets",
        "Solving problems by breaking them into overlapping subproblems and caching results",
        "Searching in graphs",
        "Memory management in OS"
      ],
      correctIndex: 1,
      explanation: "Dynamic Programming solves problems by breaking them into overlapping subproblems, storing (memoizing) results to avoid redundant computation."
    }
  ],

  /* ── JAVA ───────────────────────────────────────────────── */
  java: [
    {
      id: 1,
      question: "Which keyword is used to prevent a class from being inherited in Java?",
      example: "The String class in Java is declared final so it cannot be extended.",
      options: ["static", "private", "final", "abstract"],
      correctIndex: 2,
      explanation: "The 'final' keyword on a class prevents it from being subclassed. 'private' affects access, not inheritance."
    },
    {
      id: 2,
      question: "What is the output of: System.out.println(10 / 3); in Java?",
      example: "Both 10 and 3 are integers — Java does integer division.",
      options: ["3.33", "3", "3.0", "Compile error"],
      correctIndex: 1,
      explanation: "In Java, dividing two integers performs integer division, discarding the remainder. 10 / 3 = 3."
    },
    {
      id: 3,
      question: "Which OOP pillar allows a subclass to provide a specific implementation of a method already defined in its superclass?",
      example: "A Dog class overrides the speak() method from Animal to bark instead of generic sound.",
      options: ["Encapsulation", "Abstraction", "Method Overloading", "Method Overriding"],
      correctIndex: 3,
      explanation: "Method Overriding (runtime polymorphism) lets a subclass redefine a method from its parent class with the same signature."
    },
    {
      id: 4,
      question: "What is the default value of an int instance variable in Java?",
      example: "When you declare 'int count;' in a class without assigning it.",
      options: ["null", "undefined", "0", "-1"],
      correctIndex: 2,
      explanation: "In Java, uninitialized instance variables of type int default to 0. Objects default to null."
    },
    {
      id: 5,
      question: "Which interface must be implemented to make a Java class usable in a for-each loop?",
      example: "ArrayList works in for-each because it implements this interface.",
      options: ["Serializable", "Comparable", "Iterable", "Runnable"],
      correctIndex: 2,
      explanation: "Implementing Iterable<T> (which requires the iterator() method) enables a class to be used in enhanced for-each loops."
    },
    {
      id: 6,
      question: "What does JVM stand for?",
      example: "It's why Java programs can run on Windows, Mac, and Linux without recompiling.",
      options: ["Java Virtual Memory", "Java Variable Manager", "Java Virtual Machine", "Java Verified Module"],
      correctIndex: 2,
      explanation: "JVM (Java Virtual Machine) is the runtime engine that executes Java bytecode, enabling platform independence."
    },
    {
      id: 7,
      question: "Which Java collection allows duplicate elements and maintains insertion order?",
      example: "Adding [1, 2, 2, 3] — all four elements are stored, in that order.",
      options: ["HashSet", "TreeSet", "ArrayList", "HashMap"],
      correctIndex: 2,
      explanation: "ArrayList implements List, which allows duplicates and maintains the order elements were inserted."
    },
    {
      id: 8,
      question: "What is the purpose of the 'super' keyword in Java?",
      example: "Calling super() in a child class constructor invokes the parent class constructor.",
      options: [
        "To declare a superclass",
        "To call the current class constructor",
        "To access parent class members or constructors",
        "To make a class abstract"
      ],
      correctIndex: 2,
      explanation: "'super' refers to the immediate parent class. It is used to call parent constructors and access overridden methods/fields."
    },
    {
      id: 9,
      question: "Which exception is thrown when you try to access an index beyond an array's length?",
      example: "int[] arr = {1,2,3}; then accessing arr[5] triggers this.",
      options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "ClassCastException", "StackOverflowError"],
      correctIndex: 1,
      explanation: "ArrayIndexOutOfBoundsException is thrown when you access an array index that doesn't exist (negative or >= array.length)."
    },
    {
      id: 10,
      question: "What is a Lambda Expression in Java?",
      example: "List.sort((a, b) -> a.compareTo(b)); — a concise way to pass behavior.",
      options: [
        "A special type of loop",
        "An anonymous class that extends Object",
        "A concise representation of a functional interface instance",
        "A built-in Java sorting method"
      ],
      correctIndex: 2,
      explanation: "Lambda expressions (Java 8+) provide a short syntax for implementing functional interfaces — interfaces with exactly one abstract method."
    },
    {
      id: 11,
      question: "What is the difference between an abstract class and an interface in Java?",
      example: "Abstract classes can have constructors and state; interfaces (pre-Java 8) cannot.",
      options: [
        "No difference — they are interchangeable",
        "Abstract class can have constructors and state; interface is fully abstract (with default methods from Java 8)",
        "Interface can extend classes; abstract class cannot",
        "Abstract classes support multiple inheritance; interfaces do not"
      ],
      correctIndex: 1,
      explanation: "Abstract classes can have constructors, instance variables, and partial implementations. Interfaces define contracts and support multiple implementation (Java 8+ allows default methods)."
    },
    {
      id: 12,
      question: "Which keyword in Java is used to handle exceptions?",
      example: "Wrapping database calls in try { } catch (SQLException e) { }.",
      options: ["handle", "throws", "try-catch", "error"],
      correctIndex: 2,
      explanation: "The try-catch block is used to catch and handle exceptions gracefully, preventing program crashes."
    },
    {
      id: 13,
      question: "What does the 'static' keyword mean when applied to a variable?",
      example: "A counter variable shared by all instances of a class.",
      options: [
        "The variable is constant and cannot change",
        "The variable belongs to the class, not individual instances",
        "The variable is only accessible within the method",
        "The variable is stored in the stack"
      ],
      correctIndex: 1,
      explanation: "A static variable is shared across all instances of a class — there is only one copy, belonging to the class itself."
    },
    {
      id: 14,
      question: "What is autoboxing in Java?",
      example: "Assigning int 42 to an Integer variable — Java converts automatically.",
      options: [
        "Converting a double to int",
        "Automatic conversion between primitive types and their wrapper classes",
        "Cloning objects automatically",
        "Boxing objects into arrays"
      ],
      correctIndex: 1,
      explanation: "Autoboxing is the automatic conversion of primitive types (int, double, etc.) to their corresponding wrapper class objects (Integer, Double, etc.)."
    },
    {
      id: 15,
      question: "Which Java 8 feature allows you to work with collections in a functional style?",
      example: "list.stream().filter(x -> x > 5).map(x -> x * 2).collect(Collectors.toList());",
      options: ["Generics", "Streams API", "Reflection", "Serialization"],
      correctIndex: 1,
      explanation: "The Streams API (Java 8) enables functional-style operations on collections — filter, map, reduce, collect, etc."
    }
  ],

  /* ── PYTHON ─────────────────────────────────────────────── */
  python: [
    {
      id: 1,
      question: "Which Python data type is immutable and ordered?",
      example: "coordinates = (10.5, 20.3) — once set, it cannot be changed.",
      options: ["List", "Dictionary", "Set", "Tuple"],
      correctIndex: 3,
      explanation: "Tuples are immutable (cannot be modified after creation) and ordered (elements maintain their position)."
    },
    {
      id: 2,
      question: "What is the output of: print(type([]))?",
      example: "[] is Python's literal syntax for creating an empty list.",
      options: ["<class 'tuple'>", "<class 'list'>", "<class 'array'>", "<class 'dict'>"],
      correctIndex: 1,
      explanation: "[] creates a list object. type([]) returns <class 'list'> in Python."
    },
    {
      id: 3,
      question: "Which Python keyword is used to define a generator function?",
      example: "def count_up(n): for i in range(n): yield i — lazy evaluation.",
      options: ["return", "yield", "generate", "produce"],
      correctIndex: 1,
      explanation: "'yield' turns a function into a generator. The function pauses at each yield and resumes when next() is called."
    },
    {
      id: 4,
      question: "What is a Python decorator?",
      example: "@login_required above a view function wraps it with authentication logic.",
      options: [
        "A special comment block for documentation",
        "A function that takes another function and extends its behavior",
        "A built-in Python class for UI components",
        "A type annotation tool"
      ],
      correctIndex: 1,
      explanation: "A decorator is a higher-order function that wraps another function, adding behavior before/after it runs — using the @ syntax."
    },
    {
      id: 5,
      question: "What is the result of: [x**2 for x in range(4)]?",
      example: "A list comprehension generates a new list — each x squared from 0 to 3.",
      options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 2, 4, 6]", "[1, 2, 3, 4]"],
      correctIndex: 1,
      explanation: "range(4) gives 0,1,2,3. Squaring each: 0²=0, 1²=1, 2²=4, 3²=9. Result: [0, 1, 4, 9]."
    },
    {
      id: 6,
      question: "Which Python data structure stores key-value pairs?",
      example: "student = {'name': 'Abhishek', 'grade': 'A'} — access by key.",
      options: ["List", "Tuple", "Set", "Dictionary"],
      correctIndex: 3,
      explanation: "Dictionary (dict) stores data as key-value pairs, allowing fast lookup, insertion, and deletion by key."
    },
    {
      id: 7,
      question: "What does 'self' refer to in a Python class method?",
      example: "def __init__(self, name): self.name = name — binds data to the instance.",
      options: [
        "The class itself",
        "The current instance of the class",
        "The parent class",
        "A global variable"
      ],
      correctIndex: 1,
      explanation: "'self' is a reference to the current instance of the class, allowing access to its attributes and methods."
    },
    {
      id: 8,
      question: "Which built-in Python function returns the number of items in an object?",
      example: "len('Hello') returns 5; len([1,2,3]) returns 3.",
      options: ["count()", "size()", "len()", "length()"],
      correctIndex: 2,
      explanation: "len() is a built-in function that returns the number of items in a sequence (string, list, tuple, dict, etc.)."
    },
    {
      id: 9,
      question: "What is the difference between 'is' and '==' in Python?",
      example: "a = [1,2,3]; b = [1,2,3]; a == b is True, but a is b is False.",
      options: [
        "They are identical operators",
        "'==' compares values; 'is' checks identity (same memory location)",
        "'is' compares values; '==' checks identity",
        "'is' works only for integers"
      ],
      correctIndex: 1,
      explanation: "'==' checks if values are equal. 'is' checks if two variables reference the exact same object in memory."
    },
    {
      id: 10,
      question: "How do you handle exceptions in Python?",
      example: "try: int('abc') except ValueError: print('Invalid!') — prevents crash.",
      options: ["try-handle", "try-except", "catch-throw", "error-recover"],
      correctIndex: 1,
      explanation: "Python uses try-except blocks to handle exceptions gracefully, preventing program termination on errors."
    },
    {
      id: 11,
      question: "What does the *args parameter do in a Python function?",
      example: "def add(*args): return sum(args) — call with add(1,2,3) or add(1,2,3,4).",
      options: [
        "Accepts a single keyword argument",
        "Accepts any number of positional arguments as a tuple",
        "Accepts any number of keyword arguments as a dict",
        "Creates a pointer to a variable"
      ],
      correctIndex: 1,
      explanation: "*args collects any number of positional arguments into a tuple, making functions flexible in the number of inputs they accept."
    },
    {
      id: 12,
      question: "Which Python library is widely used for numerical computing and array operations?",
      example: "import numpy as np; arr = np.array([1,2,3]); print(arr * 2)",
      options: ["Pandas", "Matplotlib", "NumPy", "Scikit-learn"],
      correctIndex: 2,
      explanation: "NumPy (Numerical Python) provides powerful N-dimensional array objects and mathematical operations for scientific computing."
    },
    {
      id: 13,
      question: "What is the output of: print('Python'[1:4])?",
      example: "Python string slicing: [start:end] — end index is exclusive.",
      options: ["Pyt", "yth", "ytho", "ython"],
      correctIndex: 1,
      explanation: "Slicing [1:4] takes characters at index 1, 2, 3 (not 4). 'Python'[1]='y', [2]='t', [3]='h' → 'yth'."
    },
    {
      id: 14,
      question: "Which Python concept allows a class to inherit from multiple parent classes?",
      example: "class FlyingFish(Fish, Bird): pass — inherits from both Fish and Bird.",
      options: ["Single Inheritance", "Multiple Inheritance", "Multilevel Inheritance", "Interface Inheritance"],
      correctIndex: 1,
      explanation: "Python supports Multiple Inheritance — a class can inherit attributes and methods from more than one parent class."
    },
    {
      id: 15,
      question: "What does the 'with' statement do in Python file handling?",
      example: "with open('file.txt', 'r') as f: data = f.read() — file closes automatically.",
      options: [
        "Opens a file in write mode only",
        "Automatically manages resource cleanup (e.g., closes files)",
        "Creates a context variable",
        "Handles exceptions in file operations"
      ],
      correctIndex: 1,
      explanation: "The 'with' statement uses context managers to ensure resources (like file handles) are properly cleaned up after use, even if errors occur."
    }
  ],

  /* ── HTML ───────────────────────────────────────────────── */
  html: [
    {
      id: 1,
      question: "What does HTML stand for?",
      example: "The foundation of every webpage you visit in a browser.",
      options: [
        "Hyper Trainer Markup Language",
        "Hyper Text Markup Language",
        "High-level Text Management Language",
        "Hyper Text Making Language"
      ],
      correctIndex: 1,
      explanation: "HTML stands for HyperText Markup Language — the standard language for creating web pages and web applications."
    },
    {
      id: 2,
      question: "Which HTML5 tag is used to define the navigation links section?",
      example: "The top bar of websites with links like Home, About, Contact.",
      options: ["<menu>", "<navigator>", "<nav>", "<links>"],
      correctIndex: 2,
      explanation: "<nav> is the semantic HTML5 element that represents a section of navigation links, improving accessibility and SEO."
    },
    {
      id: 3,
      question: "What is the correct DOCTYPE declaration for HTML5?",
      example: "This goes at the very top of every HTML file, before the <html> tag.",
      options: ["<!DOCTYPE html5>", "<!DOCTYPE HTML PUBLIC>", "<!DOCTYPE html>", "<html5 doctype>"],
      correctIndex: 2,
      explanation: "<!DOCTYPE html> is the simple, case-insensitive HTML5 doctype declaration that tells browsers to use standards mode."
    },
    {
      id: 4,
      question: "Which attribute is required on <img> elements for accessibility?",
      example: "Screen readers read this to visually impaired users: 'StudyHub logo'.",
      options: ["src", "alt", "title", "href"],
      correctIndex: 1,
      explanation: "The 'alt' attribute provides alternative text for images — essential for screen readers and displayed when the image fails to load."
    },
    {
      id: 5,
      question: "Which HTML input type creates a date picker in modern browsers?",
      example: "Booking a flight — click the field, a calendar appears.",
      options: ["type='calendar'", "type='datepicker'", "type='date'", "type='datetime'"],
      correctIndex: 2,
      explanation: "input type='date' renders a native date picker control in browsers that support it (Chrome, Edge, Firefox, Safari)."
    },
    {
      id: 6,
      question: "What is the purpose of the <meta charset='UTF-8'> tag?",
      example: "Without it, special characters like ñ, ü, or Indian scripts may display incorrectly.",
      options: [
        "Sets the page title",
        "Defines the character encoding for the HTML document",
        "Links to an external stylesheet",
        "Specifies the viewport for mobile"
      ],
      correctIndex: 1,
      explanation: "<meta charset='UTF-8'> declares the character encoding, ensuring all characters (including non-ASCII) are interpreted correctly."
    },
    {
      id: 7,
      question: "Which HTML tag is used to create a hyperlink?",
      example: "<a href='https://erabhi.in'>Visit StudyHub</a>",
      options: ["<link>", "<href>", "<url>", "<a>"],
      correctIndex: 3,
      explanation: "The <a> (anchor) tag creates hyperlinks. The 'href' attribute specifies the URL destination."
    },
    {
      id: 8,
      question: "What does the 'semantic HTML' principle mean?",
      example: "Using <article> instead of <div class='article'> for a blog post.",
      options: [
        "Using JavaScript to add meaning to HTML elements",
        "Using HTML elements that convey meaning about their content structure",
        "Writing HTML with special SEO meta tags",
        "Using CSS to style HTML visually"
      ],
      correctIndex: 1,
      explanation: "Semantic HTML uses meaningful elements (<header>, <article>, <footer>, etc.) that describe content purpose, improving accessibility, SEO, and maintainability."
    },
    {
      id: 9,
      question: "Which HTML element is used to embed a video file?",
      example: "Embedding a tutorial video directly on a webpage without YouTube.",
      options: ["<media>", "<embed>", "<video>", "<stream>"],
      correctIndex: 2,
      explanation: "The <video> element embeds video content with controls like play, pause, and volume, supporting mp4, webm, and ogg formats."
    },
    {
      id: 10,
      question: "What is the purpose of the <form> element's 'action' attribute?",
      example: "action='/submit' sends the form data to that server endpoint.",
      options: [
        "Specifies the CSS class of the form",
        "Defines what happens when Submit is clicked (default)",
        "Specifies the URL where form data is sent on submission",
        "Sets the HTTP method for the form"
      ],
      correctIndex: 2,
      explanation: "The 'action' attribute specifies the URL to which the form data is submitted when the user clicks the submit button."
    },
    {
      id: 11,
      question: "What does the 'id' attribute do in HTML?",
      example: "<div id='quiz-section'> — uniquely identifies this element on the page.",
      options: [
        "Groups elements with the same style",
        "Provides a unique identifier for an element on the page",
        "Links to a CSS file",
        "Sets the element's display name"
      ],
      correctIndex: 1,
      explanation: "The 'id' attribute gives a unique identifier to an element, used for CSS targeting (#id), JavaScript selection, and anchor links."
    },
    {
      id: 12,
      question: "Which HTML tag creates an ordered (numbered) list?",
      example: "Step 1, Step 2, Step 3 — a numbered list for instructions.",
      options: ["<ul>", "<li>", "<ol>", "<dl>"],
      correctIndex: 2,
      explanation: "<ol> (Ordered List) creates numbered lists. <ul> creates bullet lists. Both use <li> for individual items."
    },
    {
      id: 13,
      question: "What is the purpose of the <head> section in an HTML document?",
      example: "Contains <title>, <meta>, <link> tags — invisible to users but vital to browsers.",
      options: [
        "Displays the header/banner visible at the top of the webpage",
        "Contains metadata, title, links to CSS/JS — not directly displayed",
        "Holds the navigation menu of the page",
        "Wraps the main content of the page"
      ],
      correctIndex: 1,
      explanation: "<head> contains metadata about the document — title, charset, viewport, CSS links, scripts — none of which is rendered as visible content."
    },
    {
      id: 14,
      question: "Which attribute makes an HTML input field mandatory before form submission?",
      example: "Email fields on registration forms — browser shows an error if left empty.",
      options: ["mandatory", "validate", "required", "must-fill"],
      correctIndex: 2,
      explanation: "The 'required' attribute on an input field prevents form submission if the field is empty, with built-in browser validation."
    },
    {
      id: 15,
      question: "What is the role of the <canvas> element in HTML5?",
      example: "Drawing a chart, a game, or animations using JavaScript on a blank canvas.",
      options: [
        "Displays images uploaded by users",
        "Creates a 2D/3D drawing surface scriptable via JavaScript",
        "Embeds external web pages",
        "Provides a text input area for users"
      ],
      correctIndex: 1,
      explanation: "<canvas> provides a bitmap drawing surface that you can control with JavaScript to render 2D graphics, animations, games, and data visualizations."
    }
  ],

  /* ── CSS ────────────────────────────────────────────────── */
  css: [
    {
      id: 1,
      question: "What does CSS stand for?",
      example: "The language that controls colors, fonts, layout — the visual appearance of web pages.",
      options: [
        "Computer Style Sheets",
        "Creative Style Syntax",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correctIndex: 2,
      explanation: "CSS stands for Cascading Style Sheets. 'Cascading' refers to the priority rules that determine which styles apply when multiple rules target the same element."
    },
    {
      id: 2,
      question: "Which CSS property controls the space between the content and the border of an element?",
      example: "Adding space inside a button so text doesn't touch its edges.",
      options: ["margin", "border-spacing", "padding", "spacing"],
      correctIndex: 2,
      explanation: "Padding is the space between the element's content and its border. Margin is the space outside the border."
    },
    {
      id: 3,
      question: "What is the CSS Box Model (from outside to inside)?",
      example: "Think of a picture frame: wall-gap (margin), frame (border), mat (padding), photo (content).",
      options: [
        "Content → Padding → Border → Margin",
        "Margin → Border → Padding → Content",
        "Border → Margin → Content → Padding",
        "Padding → Content → Margin → Border"
      ],
      correctIndex: 1,
      explanation: "The CSS Box Model layers are: Margin (outermost) → Border → Padding → Content (innermost)."
    },
    {
      id: 4,
      question: "Which CSS property is used to make an element a flex container?",
      example: "After this property, child elements can be aligned with justify-content and align-items.",
      options: ["layout: flex", "position: flex", "display: flex", "flex: true"],
      correctIndex: 2,
      explanation: "display: flex makes the element a flex container, enabling flexbox layout for its direct children (flex items)."
    },
    {
      id: 5,
      question: "What does 'position: absolute' do?",
      example: "A tooltip that appears at an exact position relative to its parent container.",
      options: [
        "Positions the element relative to the viewport, always stays visible",
        "Positions the element relative to its nearest positioned ancestor",
        "Positions the element based on the normal document flow",
        "Removes the element from the page"
      ],
      correctIndex: 1,
      explanation: "position: absolute removes the element from normal flow and positions it relative to the nearest ancestor with a non-static position."
    },
    {
      id: 6,
      question: "Which CSS selector has the highest specificity?",
      example: "When multiple rules conflict, which one wins?",
      options: ["Element selector (p)", "Class selector (.btn)", "ID selector (#header)", "Universal selector (*)"],
      correctIndex: 2,
      explanation: "ID selectors have higher specificity than class selectors, which have higher specificity than element selectors. Inline styles and !important override all."
    },
    {
      id: 7,
      question: "What does 'z-index' control in CSS?",
      example: "A modal overlay appearing above all other content on the page.",
      options: [
        "The zoom level of an element",
        "The stacking order of elements on the z-axis (depth)",
        "The width of an element's border",
        "The animation speed of transitions"
      ],
      correctIndex: 1,
      explanation: "z-index controls the stacking order of positioned elements. Higher values appear in front of lower values along the z-axis."
    },
    {
      id: 8,
      question: "Which CSS property creates smooth transitions between two states?",
      example: "A button changing color from orange to red when hovered — smoothly over 0.3 seconds.",
      options: ["animation", "transform", "transition", "keyframe"],
      correctIndex: 2,
      explanation: "The 'transition' property animates changes in CSS property values over a specified duration, easing between states."
    },
    {
      id: 9,
      question: "What is the difference between 'em' and 'rem' units in CSS?",
      example: "1em in a nested element may be different from 1em at the root level.",
      options: [
        "They are identical units",
        "'em' is relative to the parent element's font size; 'rem' is relative to the root (html) font size",
        "'rem' is relative to the parent; 'em' is relative to the root",
        "'em' is for font sizes only; 'rem' is for spacing only"
      ],
      correctIndex: 1,
      explanation: "'em' is relative to the current element's parent font size. 'rem' (root em) is always relative to the <html> element's font size — more predictable."
    },
    {
      id: 10,
      question: "Which CSS property is used to create responsive layouts that adapt to screen size?",
      example: "@media (max-width: 768px) { ... } — styles applied only on mobile screens.",
      options: ["@responsive", "screen-query", "@media", "@breakpoint"],
      correctIndex: 2,
      explanation: "@media queries apply CSS rules conditionally based on device characteristics like width, height, or orientation."
    },
    {
      id: 11,
      question: "What does 'display: grid' enable?",
      example: "Creating a 3-column photo gallery layout with equal-sized cells.",
      options: [
        "A single-axis layout (row or column)",
        "A two-dimensional layout system with rows and columns",
        "A table-based layout",
        "A fixed-width centered layout"
      ],
      correctIndex: 1,
      explanation: "CSS Grid Layout creates a two-dimensional grid system, allowing precise placement of elements in both rows and columns simultaneously."
    },
    {
      id: 12,
      question: "What is a CSS custom property (CSS variable)?",
      example: "--color-primary: #7C3AED; then use it with color: var(--color-primary);",
      options: [
        "A JavaScript variable imported into CSS",
        "A reusable value declared with -- prefix and used with var()",
        "A CSS property that only works in Chrome",
        "A shorthand for multiple CSS properties"
      ],
      correctIndex: 1,
      explanation: "CSS custom properties (variables) are defined with --name syntax and accessed with var(--name), enabling theme management and DRY styling."
    },
    {
      id: 13,
      question: "Which CSS property controls the transparency of an element?",
      example: "A semi-transparent overlay: opacity: 0.5 makes it 50% see-through.",
      options: ["transparency", "visibility", "opacity", "alpha"],
      correctIndex: 2,
      explanation: "The 'opacity' property sets the transparency level from 0 (fully transparent) to 1 (fully opaque). It affects the entire element and its children."
    },
    {
      id: 14,
      question: "What does 'box-sizing: border-box' do?",
      example: "A 200px-wide element with padding: 20px — does the padding add to the width?",
      options: [
        "Includes only content in the width/height calculation",
        "Includes padding and border within the declared width/height",
        "Removes all borders from the element",
        "Makes the element a flex container"
      ],
      correctIndex: 1,
      explanation: "With border-box, padding and border are included in the element's total width/height — making layout math predictable and simpler."
    },
    {
      id: 15,
      question: "Which pseudo-class selects an element when the user hovers over it?",
      example: "Highlighting a button when the mouse cursor moves over it.",
      options: [":focus", ":active", ":hover", ":visited"],
      correctIndex: 2,
      explanation: "The :hover pseudo-class applies styles when the user's pointing device (mouse) is positioned over an element."
    }
  ],

  /* ── JAVASCRIPT ─────────────────────────────────────────── */
  js: [
    {
      id: 1,
      question: "What is the difference between 'let' and 'var' in JavaScript?",
      example: "if(true){ var x = 1; let y = 2; } — which is accessible outside the block?",
      options: [
        "No difference — they are identical",
        "'var' is block-scoped; 'let' is function-scoped",
        "'let' is block-scoped; 'var' is function/globally-scoped",
        "'let' allows re-declaration; 'var' does not"
      ],
      correctIndex: 2,
      explanation: "'let' is block-scoped (limited to the {} block), while 'var' is function-scoped (or global if outside a function). 'let' also doesn't hoist declarations to the top."
    },
    {
      id: 2,
      question: "What is a closure in JavaScript?",
      example: "function counter(){ let count=0; return ()=>++count; } — the inner function remembers count.",
      options: [
        "A way to close the browser window",
        "A function that has access to variables from its outer (enclosing) function's scope",
        "A method to end a loop early",
        "A built-in object for managing events"
      ],
      correctIndex: 1,
      explanation: "A closure is a function that retains access to its lexical scope (outer function's variables) even after the outer function has returned."
    },
    {
      id: 3,
      question: "What does 'hoisting' mean in JavaScript?",
      example: "console.log(x); var x = 5; — does this throw an error?",
      options: [
        "Moving heavy computation to a Web Worker",
        "Variable and function declarations are moved to the top of their scope during compilation",
        "Inserting HTML elements at the top of the DOM",
        "Elevating CSS specificity of selectors"
      ],
      correctIndex: 1,
      explanation: "Hoisting moves variable declarations (var) and function declarations to the top of their scope before execution. Only declarations are hoisted, not initializations."
    },
    {
      id: 4,
      question: "What does '===' (strict equality) check in JavaScript?",
      example: "5 == '5' is true, but 5 === '5' is false — why?",
      options: [
        "Checks value equality only, with type coercion",
        "Checks both value AND type — no type coercion",
        "Checks object reference equality",
        "Checks if a variable is defined"
      ],
      correctIndex: 1,
      explanation: "'===' checks both value and type without coercion. '==' only checks value, allowing type coercion (5 == '5' is true because '5' is coerced to 5)."
    },
    {
      id: 5,
      question: "What is a Promise in JavaScript?",
      example: "fetch('https://api.example.com/data').then(res => res.json()) — asynchronous data fetching.",
      options: [
        "A guaranteed function that never throws errors",
        "An object representing the eventual completion or failure of an asynchronous operation",
        "A special loop for asynchronous code",
        "A built-in caching mechanism"
      ],
      correctIndex: 1,
      explanation: "A Promise represents an asynchronous operation's result — it can be in one of three states: pending, fulfilled (resolved), or rejected."
    },
    {
      id: 6,
      question: "What is the purpose of 'async/await' in JavaScript?",
      example: "const data = await fetch(url) — reads like synchronous code, but is asynchronous.",
      options: [
        "Enables multithreading in JavaScript",
        "Makes synchronous code run faster",
        "Provides cleaner syntax for working with Promises — avoiding .then() chains",
        "Creates a new thread for each awaited operation"
      ],
      correctIndex: 2,
      explanation: "async/await is syntactic sugar over Promises. 'async' marks a function as asynchronous; 'await' pauses execution until the Promise resolves — making async code readable."
    },
    {
      id: 7,
      question: "What is the Event Loop in JavaScript?",
      example: "setTimeout(() => console.log('B'), 0); console.log('A'); — which prints first?",
      options: [
        "A loop that handles DOM mouse events",
        "A mechanism that allows JS to perform non-blocking operations by offloading to the browser APIs and processing the callback queue",
        "A built-in for...of loop for events",
        "A loop that runs once for each DOM element"
      ],
      correctIndex: 1,
      explanation: "The Event Loop is what makes JS single-threaded yet non-blocking. It processes the call stack and, when empty, pushes callbacks from the task queue to the stack."
    },
    {
      id: 8,
      question: "What is the spread operator (...) used for?",
      example: "const merged = [...arr1, ...arr2]; — combines two arrays without mutation.",
      options: [
        "Declaring rest parameters in functions",
        "Expanding an iterable (array/object) into individual elements",
        "Creating generators",
        "Deleting object properties"
      ],
      correctIndex: 1,
      explanation: "The spread operator (...) expands an iterable into individual elements — useful for copying arrays/objects, merging, and passing elements as function arguments."
    },
    {
      id: 9,
      question: "What does 'typeof null' return in JavaScript?",
      example: "A famous quirk of JavaScript — typeof null is not 'null'.",
      options: ["'null'", "'undefined'", "'object'", "'boolean'"],
      correctIndex: 2,
      explanation: "typeof null returns 'object' — this is a well-known bug in JavaScript from its early implementation that was never fixed for backward compatibility."
    },
    {
      id: 10,
      question: "What is destructuring assignment in JavaScript?",
      example: "const {name, age} = person; — instead of person.name and person.age.",
      options: [
        "Deleting properties from objects",
        "Converting arrays to objects",
        "Extracting values from arrays or objects into distinct variables",
        "Reversing an array's structure"
      ],
      correctIndex: 2,
      explanation: "Destructuring allows unpacking values from arrays or properties from objects into individual variables with a clean, concise syntax."
    },
    {
      id: 11,
      question: "What is the difference between null and undefined in JavaScript?",
      example: "let x; — x is undefined. let y = null; — y is intentionally empty.",
      options: [
        "They are identical — both mean 'no value'",
        "'undefined' means a variable is declared but not assigned; 'null' is an intentional absence of value",
        "'null' is a system error; 'undefined' is user-assigned",
        "'undefined' only exists in strict mode"
      ],
      correctIndex: 1,
      explanation: "'undefined' is the default value of uninitialized variables. 'null' is an explicit assignment meaning 'no value' or 'empty' — an intentional choice by the developer."
    },
    {
      id: 12,
      question: "What does Array.prototype.map() do?",
      example: "[1,2,3].map(x => x * 2) returns [2,4,6] — original array unchanged.",
      options: [
        "Filters elements based on a condition",
        "Reduces an array to a single value",
        "Creates a new array by applying a function to each element",
        "Sorts array elements in place"
      ],
      correctIndex: 2,
      explanation: "map() creates a new array populated with the results of calling a provided function on every element, without mutating the original array."
    },
    {
      id: 13,
      question: "What is an Arrow Function in JavaScript?",
      example: "const add = (a, b) => a + b; — equivalent to function add(a,b){ return a+b; }",
      options: [
        "A function declared with the 'arrow' keyword",
        "A shorthand function syntax that doesn't bind its own 'this'",
        "A function that can only return one value",
        "A function type available only in modules"
      ],
      correctIndex: 1,
      explanation: "Arrow functions provide a compact syntax and don't have their own 'this' — they inherit 'this' from the enclosing lexical context."
    },
    {
      id: 14,
      question: "What does the 'use strict' directive do in JavaScript?",
      example: "'use strict'; x = 5; — throws ReferenceError because x is not declared.",
      options: [
        "Enables TypeScript features",
        "Activates strict mode — catches common mistakes and prevents unsafe features",
        "Forces all variables to be typed",
        "Makes the code run faster by enabling JIT compilation"
      ],
      correctIndex: 1,
      explanation: "'use strict' enables strict mode, which throws errors for common mistakes like using undeclared variables, duplicate parameters, and other potentially unsafe behavior."
    },
    {
      id: 15,
      question: "What is the purpose of JSON.parse() in JavaScript?",
      example: "const obj = JSON.parse('{\"name\":\"Abhishek\"}'); — converts a string to an object.",
      options: [
        "Converts a JavaScript object to a JSON string",
        "Sends JSON data to a server",
        "Parses a JSON string and returns the corresponding JavaScript value/object",
        "Validates JSON syntax without converting"
      ],
      correctIndex: 2,
      explanation: "JSON.parse() deserializes a JSON string into a JavaScript object/value. The reverse — converting JS to JSON string — is done by JSON.stringify()."
    }
  ]

};

/* ────────────────────────────────────────────────────────────
   QUIZ CONFIG
   ─────────────────────────────────────────────────────────── */

const CONFIG = {
  TIMER_SECONDS:    30,
  AUTO_ADVANCE_MS:  1500,
  CAROUSEL_MS:      3500,
  URGENT_THRESHOLD: 10
};

/* ────────────────────────────────────────────────────────────
   QUIZ METADATA (for hub page)
   ─────────────────────────────────────────────────────────── */

const QUIZ_META = {
  dsa:    { title: 'DSA Quiz',        subtitle: 'Data Structures & Algorithms', emoji: '🌳', difficulty: 'Medium', time: '10 min', file: 'dsaquiz.html',    gradient: 'linear-gradient(135deg,#4C1D95,#7C3AED)' },
  java:   { title: 'Java Quiz',       subtitle: 'Object-Oriented Programming',  emoji: '☕', difficulty: 'Medium', time: '10 min', file: 'javaquiz.html',   gradient: 'linear-gradient(135deg,#7C2D12,#EA580C)' },
  python: { title: 'Python Quiz',     subtitle: 'Python Programming Language',  emoji: '🐍', difficulty: 'Easy',   time: '8 min',  file: 'pythonquiz.html', gradient: 'linear-gradient(135deg,#064E3B,#059669)' },
  html:   { title: 'HTML Quiz',       subtitle: 'Hypertext Markup Language',    emoji: '🌐', difficulty: 'Easy',   time: '7 min',  file: 'htmlquiz.html',   gradient: 'linear-gradient(135deg,#1E3A5F,#2563EB)' },
  css:    { title: 'CSS Quiz',        subtitle: 'Cascading Style Sheets',       emoji: '🎨', difficulty: 'Easy',   time: '8 min',  file: 'cssquiz.html',    gradient: 'linear-gradient(135deg,#831843,#DB2777)' },
  js:     { title: 'JavaScript Quiz', subtitle: 'ES6+ & Core JS Concepts',      emoji: '⚡', difficulty: 'Medium', time: '10 min', file: 'jsquiz.html',     gradient: 'linear-gradient(135deg,#713F12,#CA8A04)' }
};

/* ────────────────────────────────────────────────────────────
   STATE
   ─────────────────────────────────────────────────────────── */

let state = {
  quizKey:              null,
  quizData:             [],
  currentQuestionIndex: 0,
  score:                0,
  userAnswers:          [],
  timerInterval:        null,
  isAnswered:           false,
  timeRemaining:        CONFIG.TIMER_SECONDS,
  carouselIndex:        0,
  carouselInterval:     null,
  carouselTotal:        0,
  carouselPaused:       false
};

/* ────────────────────────────────────────────────────────────
   DOM HELPERS
   ─────────────────────────────────────────────────────────── */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ────────────────────────────────────────────────────────────
   NAVBAR
   ─────────────────────────────────────────────────────────── */

function initNavbar() {
  const hamburger   = $('.quiz-navbar__hamburger');
  const mobileMenu  = $('.quiz-navbar__mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

/* ────────────────────────────────────────────────────────────
   CAROUSEL (Hub Page)
   ─────────────────────────────────────────────────────────── */

function initCarousel() {
  const wrapper = $('.carousel-wrapper');
  if (!wrapper) return;

  const track     = $('.carousel-track', wrapper);
  const slides    = $$('.carousel-slide', wrapper);
  const dotsWrap  = $('.carousel-dots');
  const prevBtn   = $('.carousel-arrow--prev');
  const nextBtn   = $('.carousel-arrow--next');

  if (!slides.length) return;

  state.carouselTotal = slides.length;
  state.carouselIndex = 0;

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className  = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goToSlide(index) {
    state.carouselIndex = (index + state.carouselTotal) % state.carouselTotal;
    track.style.transform = `translateX(-${state.carouselIndex * 100}%)`;
    $$('.carousel-dot', dotsWrap).forEach((d, i) => {
      d.classList.toggle('active', i === state.carouselIndex);
    });
  }

  function nextSlide() {
    if (!state.carouselPaused) goToSlide(state.carouselIndex + 1);
  }

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(state.carouselIndex - 1); restartCarousel(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(state.carouselIndex + 1); restartCarousel(); });

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => { state.carouselPaused = true; });
  wrapper.addEventListener('mouseleave', () => { state.carouselPaused = false; });

  // Touch / swipe
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  wrapper.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goToSlide(state.carouselIndex + (diff > 0 ? 1 : -1));
  });

  function restartCarousel() {
    clearInterval(state.carouselInterval);
    state.carouselInterval = setInterval(nextSlide, CONFIG.CAROUSEL_MS);
  }

  state.carouselInterval = setInterval(nextSlide, CONFIG.CAROUSEL_MS);
}

/* ────────────────────────────────────────────────────────────
   QUIZ INIT
   ─────────────────────────────────────────────────────────── */

function initQuiz() {
  const key = document.body.dataset.quiz;
  if (!key || !QUESTION_BANKS[key]) return;

  state.quizKey  = key;
  state.quizData = [...QUESTION_BANKS[key]];
  shuffleArray(state.quizData);

  state.userAnswers = new Array(state.quizData.length).fill(-1);

  updateQuizMeta();
  showIntroScreen();
}

function updateQuizMeta() {
  const meta = QUIZ_META[state.quizKey];
  if (!meta) return;
  const titleEl    = $('#quiz-title');
  const subtitleEl = $('#quiz-subtitle');
  const countEl    = $('#quiz-count');
  const diffEl     = $('#quiz-difficulty');
  const timeEl     = $('#quiz-time');
  const iconEl     = $('#quiz-icon');
  const pageTitleEl = $('title');

  if (titleEl)    titleEl.textContent    = meta.title;
  if (subtitleEl) subtitleEl.textContent = meta.subtitle;
  if (countEl)    countEl.textContent    = `${state.quizData.length} Questions`;
  if (diffEl)     diffEl.textContent     = meta.difficulty;
  if (timeEl)     timeEl.textContent     = meta.time;
  if (iconEl)     iconEl.textContent     = meta.emoji;
  if (pageTitleEl) pageTitleEl.textContent = `${meta.title} | StudyHub`;
}

/* ────────────────────────────────────────────────────────────
   SCREEN MANAGEMENT
   ─────────────────────────────────────────────────────────── */

function showSection(id) {
  ['quiz-intro', 'quiz-question-section', 'quiz-result'].forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.classList.toggle('hidden', sec !== id);
  });

  if (id === 'quiz-result') {
    const resultEl = document.getElementById('quiz-result');
    if (resultEl) resultEl.classList.add('visible');
  }
}

function showIntroScreen() {
  showSection('quiz-intro');
}

/* ────────────────────────────────────────────────────────────
   QUESTION RENDERING
   ─────────────────────────────────────────────────────────── */

function renderQuestion(index) {
  const q = state.quizData[index];
  if (!q) return;

  state.isAnswered   = false;
  state.timeRemaining = CONFIG.TIMER_SECONDS;

  // Progress
  const progress = ((index) / state.quizData.length) * 100;
  const progressBar   = $('#quiz-progress-bar');
  const progressLabel = $('#quiz-progress-label');
  if (progressBar)   progressBar.style.width = `${progress}%`;
  if (progressLabel) progressLabel.textContent = `Question ${index + 1} of ${state.quizData.length}`;

  // Question
  const qNum  = $('#question-number');
  const qText = $('#question-text');
  const qEx   = $('#question-example');
  if (qNum)  qNum.textContent  = `Q${index + 1}`;
  if (qText) qText.textContent = q.question;
  if (qEx)   qEx.textContent   = q.example;

  // Options
  const optionsContainer = $('#quiz-options');
  if (!optionsContainer) return;
  optionsContainer.innerHTML = '';

  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('tabindex', '0');
    btn.innerHTML = `
      <span class="quiz-option__letter">${letters[i]}</span>
      <span class="quiz-option__text">${escapeHtml(opt)}</span>
      <span class="quiz-option__radio"></span>
    `;
    btn.addEventListener('click', () => selectAnswer(i));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectAnswer(i); }
    });
    optionsContainer.appendChild(btn);
  });

  // Explanation & Next button
  const expEl  = $('#quiz-explanation');
  const nextBtn = $('#quiz-next-btn');
  if (expEl)  { expEl.textContent = ''; expEl.classList.remove('visible'); }
  if (nextBtn) nextBtn.classList.add('hidden');

  // Timer
  startTimer();
  showSection('quiz-question-section');
}

/* ────────────────────────────────────────────────────────────
   ANSWER SELECTION & FEEDBACK
   ─────────────────────────────────────────────────────────── */

function selectAnswer(optionIndex) {
  if (state.isAnswered) return;
  state.isAnswered = true;

  stopTimer();

  const q        = state.quizData[state.currentQuestionIndex];
  const isCorrect = optionIndex === q.correctIndex;

  if (isCorrect) state.score++;
  state.userAnswers[state.currentQuestionIndex] = optionIndex;

  showFeedback(optionIndex, q.correctIndex);
  showExplanation(q.explanation);

  const nextBtn = $('#quiz-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');

  // Auto-advance
  setTimeout(autoAdvance, CONFIG.AUTO_ADVANCE_MS);
}

function showFeedback(selected, correct) {
  const options = $$('.quiz-option');
  options.forEach((btn, i) => {
    btn.classList.add('quiz-option--locked');
    btn.setAttribute('aria-pressed', i === selected ? 'true' : 'false');

    if (i === correct) {
      btn.classList.add('quiz-option--correct');
    } else if (i === selected && selected !== correct) {
      btn.classList.add('quiz-option--wrong');
    }
  });
}

function showExplanation(text) {
  const expEl = $('#quiz-explanation');
  if (!expEl) return;
  expEl.innerHTML = `<strong>💡 Explanation:</strong> ${escapeHtml(text)}`;
  expEl.classList.add('visible');
}

/* ────────────────────────────────────────────────────────────
   TIMER
   ─────────────────────────────────────────────────────────── */

function startTimer() {
  stopTimer();
  state.timeRemaining = CONFIG.TIMER_SECONDS;
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timeRemaining--;
    updateTimerDisplay();
    if (state.timeRemaining <= 0) timeUp();
  }, 1000);
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const timerEl = $('#quiz-timer');
  if (!timerEl) return;
  timerEl.textContent = `⏱ ${state.timeRemaining}s`;

  if (state.timeRemaining <= CONFIG.URGENT_THRESHOLD) {
    timerEl.classList.add('quiz-timer--urgent');
  } else {
    timerEl.classList.remove('quiz-timer--urgent');
  }
}

function timeUp() {
  if (state.isAnswered) return;
  state.isAnswered = true;
  stopTimer();

  const q = state.quizData[state.currentQuestionIndex];
  state.userAnswers[state.currentQuestionIndex] = -1; // skipped

  // Reveal correct answer
  const options = $$('.quiz-option');
  options.forEach((btn, i) => {
    btn.classList.add('quiz-option--locked');
    if (i === q.correctIndex) btn.classList.add('quiz-option--correct');
  });

  showExplanation(q.explanation);
  showToast('⏰ Time Up!');

  const nextBtn = $('#quiz-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');

  setTimeout(autoAdvance, CONFIG.AUTO_ADVANCE_MS);
}

/* ────────────────────────────────────────────────────────────
   NAVIGATION
   ─────────────────────────────────────────────────────────── */

function autoAdvance() {
  nextQuestion();
}

function nextQuestion() {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex >= state.quizData.length) {
    showResult();
  } else {
    renderQuestion(state.currentQuestionIndex);
  }
}

/* ────────────────────────────────────────────────────────────
   RESULT SCREEN
   ─────────────────────────────────────────────────────────── */

function showResult() {
  stopTimer();

  const total   = state.quizData.length;
  const score   = state.score;
  const percent = Math.round((score / total) * 100);
  const wrong   = state.userAnswers.filter((a, i) => a !== -1 && a !== state.quizData[i].correctIndex).length;
  const skipped = state.userAnswers.filter(a => a === -1).length;

  // Update DOM
  setTextContent('#result-score',       score);
  setTextContent('#result-total',       `/ ${total}`);
  setTextContent('#result-correct',     `✅ ${score} Correct`);
  setTextContent('#result-wrong',       `❌ ${wrong} Wrong`);
  setTextContent('#result-skipped',     `⏭ ${skipped} Skipped`);
  setTextContent('#result-percent',     `${percent}%`);

  const remark = getRemark(percent);
  setTextContent('#result-remark',      remark.title);
  setTextContent('#result-sub-remark',  remark.message);
  setTextContent('#result-emoji',       remark.emoji);

  // Progress ring
  const ringFg = document.getElementById('result-ring-fg');
  if (ringFg) {
    const circumference = 408;
    const offset = circumference - (circumference * percent / 100);
    ringFg.style.strokeDashoffset = offset;
  }

  // Animate score count-up
  animateCount('#result-score', 0, score, 1000);

  // Update progress bar to 100%
  const progressBar = $('#quiz-progress-bar');
  if (progressBar) progressBar.style.width = '100%';

  showSection('quiz-result');

  // Confetti for high scores
  if (percent >= 75) launchConfetti();
}

function getRemark(percent) {
  if (percent >= 90) return { title: "Outstanding! You're a genius!", message: "Perfect score territory — you truly mastered this topic!", emoji: "🏆" };
  if (percent >= 75) return { title: "Excellent work! Almost perfect!",  message: "You have a strong grip on this subject. Keep it up!", emoji: "🌟" };
  if (percent >= 60) return { title: "Good job! Keep practicing!",       message: "You're on the right track. Review a few more concepts.", emoji: "👍" };
  if (percent >= 40) return { title: "Not bad! Review the missed topics.", message: "Solid attempt! Go through the questions you missed.", emoji: "📚" };
  if (percent >= 20) return { title: "Keep going! Practice makes perfect.", message: "Don't be discouraged — every attempt teaches you something.", emoji: "💪" };
  return { title: "Don't give up! Start from basics.", message: "Review the fundamentals and try again — you've got this!", emoji: "🎯" };
}

/* ────────────────────────────────────────────────────────────
   RESET / RETRY
   ─────────────────────────────────────────────────────────── */

function resetQuiz() {
  stopTimer();
  state.currentQuestionIndex = 0;
  state.score                = 0;
  state.userAnswers          = new Array(state.quizData.length).fill(-1);
  state.isAnswered           = false;

  shuffleArray(state.quizData);

  // Remove confetti
  const confetti = $('.confetti-container');
  if (confetti) confetti.remove();

  // Reset result ring
  const ringFg = document.getElementById('result-ring-fg');
  if (ringFg) ringFg.style.strokeDashoffset = 408;

  // Remove visible class from result
  const resultEl = document.getElementById('quiz-result');
  if (resultEl) resultEl.classList.remove('visible');

  showIntroScreen();
}

/* ────────────────────────────────────────────────────────────
   SHARE SCORE
   ─────────────────────────────────────────────────────────── */

function shareScore() {
  const meta    = QUIZ_META[state.quizKey];
  const total   = state.quizData.length;
  const percent = Math.round((state.score / total) * 100);
  const text    = `🎯 I scored ${state.score}/${total} (${percent}%) on the ${meta?.title || 'StudyHub'} Quiz!\nTest yourself at https://erabhi.in/studyHub/quiz/`;

  if (navigator.share) {
    navigator.share({ title: 'StudyHub Quiz Score', text });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('📋 Score copied to clipboard!'));
  }
}

/* ────────────────────────────────────────────────────────────
   CONFETTI
   ─────────────────────────────────────────────────────────── */

function launchConfetti() {
  const existing = $('.confetti-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#7C3AED','#EA580C','#16A34A','#2563EB','#DB2777','#CA8A04','#F97316','#A855F7'];
  const shapes = ['circle','square'];

  for (let i = 0; i < 80; i++) {
    const piece    = document.createElement('div');
    const color    = colors[Math.floor(Math.random() * colors.length)];
    const shape    = shapes[Math.floor(Math.random() * shapes.length)];
    const size     = Math.random() * 10 + 6;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 3;
    const duration = Math.random() * 3 + 2;

    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : '2px'};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => { if (container.parentNode) container.remove(); }, 6000);
}

/* ────────────────────────────────────────────────────────────
   TOAST NOTIFICATION
   ─────────────────────────────────────────────────────────── */

function showToast(message) {
  let toast = $('.quiz-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'quiz-toast';
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ────────────────────────────────────────────────────────────
   FLIP CARD (About Page)
   ─────────────────────────────────────────────────────────── */

function initFlipCard() {
  const flipCard = $('.flip-card');
  if (!flipCard) return;

  // Click / tap to flip (mobile + desktop)
  flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
  });

  // Keyboard accessibility
  flipCard.setAttribute('tabindex', '0');
  flipCard.setAttribute('role', 'button');
  flipCard.setAttribute('aria-label', 'Developer flip card — press Enter to flip');
  flipCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipCard.classList.toggle('flipped');
    }
  });
}

/* ────────────────────────────────────────────────────────────
   UTILITIES
   ─────────────────────────────────────────────────────────── */

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function setTextContent(sel, text) {
  const el = $(sel);
  if (el) el.textContent = text;
}

function animateCount(sel, from, to, duration) {
  const el = $(sel);
  if (!el) return;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ────────────────────────────────────────────────────────────
   EVENT BINDING (for quiz pages)
   ─────────────────────────────────────────────────────────── */

function bindQuizEvents() {
  // Start quiz button
  const startBtn = $('#quiz-start-btn');
  if (startBtn) startBtn.addEventListener('click', () => {
    renderQuestion(state.currentQuestionIndex);
  });

  // Next question button
  const nextBtn = $('#quiz-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextQuestion();
  });

  // Retry button
  const retryBtn = $('#quiz-retry-btn');
  if (retryBtn) retryBtn.addEventListener('click', resetQuiz);

  // Share button
  const shareBtn = $('#quiz-share-btn');
  if (shareBtn) shareBtn.addEventListener('click', shareScore);

  // Back link
  const backBtn = $('#quiz-back-btn');
  if (backBtn) backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
  });
}

/* ────────────────────────────────────────────────────────────
   ENTRY POINT
   ─────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();

  const page = document.body.dataset.page;

  if (page === 'hub') {
    initCarousel();
  } else if (document.body.dataset.quiz) {
    initQuiz();
    bindQuizEvents();
  } else if (page === 'about') {
    initFlipCard();
  }
});