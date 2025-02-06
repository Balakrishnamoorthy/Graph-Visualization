Interactive Graph Visualization

🚀 Project Overview
This project is a **React-based interactive graph visualization tool** that allows users to create, modify, and manage nodes and edges dynamically. It includes features like **custom nodes, editable edges, undo/redo functionality, and state persistence with Redux**.



📌 Features
- **Customizable Nodes & Edges**
- **Drag & Drop Functionality**
- **Undo / Redo Actions**
- **Node Selection & Styling**
- **State Management with Redux**
- **Live Graph Updates**



🛠️ Tech Stack
- **Frontend**: React, React Flow, Redux Toolkit
- **State Management**: Redux
- **Styling**: CSS



⚡ Getting Started
1️⃣ Clone the Repository

gh repo clone Balakrishnamoorthy/Graph-Visualization
cd project-name


2️⃣ Install Dependencies
npm install 


3️⃣ Run the Development Server

npm start  


The application will be available at **http://localhost:3000**.


🔧 Available Scripts
| Command         | Description |
|-----------------|-------------|
| `npm start`     | Start the development server |
| `npm run build` | Create a production build |
| `npm test`      | Run tests (if applicable) |
| `npm run lint`  | Check for errors |



📂 Project Structure

project-name/
│── src/
│   ├── components/
│   │   ├── Graph.js
│   │   ├── NodeControls.js
|   ├── customize/
│   │   ├── customeNodes.js
|   |   ├── customeEdges.js
│   ├── store.js
│   ├── graphSlice.js
│   ├── App.js
│   ├── index.js
│── public/
│── README.md
│── package.json



🔗 Dependencies
json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-redux": "^8.0.5",
    "react-flow": "^11.8.1",
    "redux-toolkit": "^1.8.5"
  }
}




🎨 Usage Guide
🖱️ Selecting a Node
Click on a node to select it. The **Node Controls** panel will update with the selected node’s details.

🎨 Changing Node Color
1. Select a node.
2. Choose a new color from the Node Controls panel.
3. The color change will reflect immediately.

↩️ Undo / Redo Actions
- Click **Undo** to revert the last action.
- Click **Redo** to reapply the last undone action.



🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.



🛠️ Future Improvements
- 🏷️ **Better UI Design**
- ⚡ **Performance Optimization**
- 📌 **More Customizable Node Styles**



📞 Contact
For any queries, reach out at `balakrishnamoorthy77@gmail.com` or open an issue in the repo.

Happy Coding! 🚀

