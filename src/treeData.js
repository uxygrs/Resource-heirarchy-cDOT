import React from "react";

const maxDepth = 5;

const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

const treeData = [
  {
    title: "Unrelated component",
    expanded: false,
    children: [
      {
        title: "Unrelated component",
        expanded: true
      }
    ]
  },
  {
    title: "Ancestor",
    subtitle: "of target",
    expanded: true,
    children: [
      {
        title: "Ancestor",
        subtitle: "of target",
        expanded: true,
        children: [
          {
            title: "Parent",
            subtitle: "of target",
            expanded: true,
            children: [
              {
                title: "Target component",
                expanded: true,
                children: [
                  {
                    title: "Child",
                    subtitle: "of target",
                    expanded: true,
                    children: [
                      {
                        title: "Descendant",
                        subtitle: "of target",
                        expanded: true,
                        children: [
                          {
                            title: "Descendant",
                            subtitle: "of target",
                            expanded: true
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Unrelated component",
    expanded: false,
    children: [
      {
        title: "Unrelated component",
        expanded: true
      }
    ]
  }
];

export default treeData;
