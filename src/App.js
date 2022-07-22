import React from "react";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";

import treeData from "./treeData";

const maxDepth = 5;

const alertNodeInfo = ({ node, path, treeIndex }) => {
  const objectString = Object.keys(node)
    .map(k => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
    .join(",\n   ");

  global.alert(
    "Info passed to the button generator:\n\n" +
      `node: {\n   ${objectString}\n},\n` +
      `path: [${path.join(", ")}],\n` +
      `treeIndex: ${treeIndex}`
  );
};

export default class App extends React.Component {
  state = {
    searchString: "",
    searchFocusIndex: 0,
    searchFoundCount: null,
    treeData
  };

  componentDidMount() {
    setImmediate(() => {
      // hack to apply some colours
      const nodes = document.getElementsByClassName("rst__rowContents");
      nodes[1].style.backgroundColor = "lightyellow";
      nodes[2].style.backgroundColor = "lightyellow";
      nodes[3].style.backgroundColor = "lightyellow";
      nodes[4].style.backgroundColor = "yellow";
      nodes[5].style.backgroundColor = "lightyellow";
      nodes[6].style.backgroundColor = "lightyellow";
      nodes[7].style.backgroundColor = "lightyellow";
    });
  }

  handleTreeOnChange = treeData => {
    this.setState({ treeData });
  };

  handleSearchOnChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  selectPrevMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1
    });
  };

  selectNextMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0
    });
  };

  toggleNodeExpansion = expanded => {
    this.setState(prevState => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded
      })
    }));
  };

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount
    } = this.state;

    return (
      <div className="wrapper">
        <div className="tree-wrapper">
          <SortableTree
            treeData={treeData}
            onChange={this.handleTreeOnChange}
            onMoveNode={({ node, treeIndex, path }) =>
              global.console.debug(
                "node:",
                node,
                "treeIndex:",
                treeIndex,
                "path:",
                path
              )
            }
            maxDepth={maxDepth}
            searchQuery={searchString}
            searchFocusOffset={searchFocusIndex}
            canDrag={({ node }) => !node.noDragging}
            canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0
              })
            }
            isVirtualized={true}
            generateNodeProps={rowInfo => ({
              buttons: []
            })}
          />
        </div>
      </div>
    );
  }
}
