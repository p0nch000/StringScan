# StringScan

StringScan is an advanced text processing tool that combines the power of C++ algorithms with a user-friendly React frontend. It offers efficient pattern matching, text similarity comparison, palindrome detection, and autocomplete functionality.

## Features

- **Pattern Search**: Utilizes KMP or Z algorithm for efficient pattern matching
- **Text Similarity**: Finds the longest common subsequence (LCS) between two texts
- **Palindrome Detection**: Identifies the largest palindrome using Manacher's algorithm
- **Autocomplete**: Provides word suggestions using a Trie data structure
- **Web Interface**: Easy-to-use React frontend for text analysis and manipulation

## Requirements

- C++ compiler (C++11 or later)
- Node.js and npm
- CMake (for building C++ backend)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/StringScan.git
   cd StringScan
   ```

2. Build the C++ backend:
   ```
   mkdir build && cd build
   cmake ..
   make
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

## Running the Application

1. Start the C++ backend server:
   ```
   ./build/stringscan_server
   ```

2. In a new terminal, start the React frontend:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Load one or two text files using the file upload feature.
2. Use the search bar to find patterns within the text.
3. Click the "Similarity" button when two texts are loaded to find the longest common subsequence.
4. Use the "Palindrome" button to find the largest palindrome in the text.
5. Start typing in the autocomplete field to receive word suggestions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
