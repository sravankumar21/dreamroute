import React, { useState, useEffect } from "react";
import "../styles/CareerRoadmap.css";

const CareerRoadmap = () => {
  const [pathData, setPathData] = useState({});
  const [visibleNodes, setVisibleNodes] = useState({ post_10th: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/roadmap.json') // Directly using the relative path from public
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setPathData(data))
      .catch((error) => {
        console.error("Error fetching JSON:", error);
        setError(error.message);
      });
  }, []);

  const handleNodeClick = (nodeKey) => {
    const newVisibleNodes = { ...visibleNodes };

    // Close all nodes if a new top-level node is clicked
    if (
      nodeKey === "post_10th" ||
      nodeKey === "post_intermediate" ||
      nodeKey === "post_diploma" ||
      nodeKey === "post_btech"
    ) {
      Object.keys(newVisibleNodes).forEach((key) => {
        if (key !== nodeKey) delete newVisibleNodes[key];
      });

      if (newVisibleNodes[nodeKey]) {
        delete newVisibleNodes[nodeKey];
      } else {
        newVisibleNodes[nodeKey] = Object.keys(pathData[nodeKey]);
      }
    } else {
      // Toggle child nodes
      const parentKey = nodeKey.split(".").slice(0, -1).join(".");
      if (newVisibleNodes[parentKey]) {
        if (newVisibleNodes[nodeKey]) {
          delete newVisibleNodes[nodeKey];
        } else {
          const parts = nodeKey.split(".");
          let items = pathData;
          parts.forEach((part) => {
            items = items[part] || {};
          });

          if (typeof items === "object" && !Array.isArray(items)) {
            newVisibleNodes[nodeKey] = Object.keys(items);
          }
        }
      } else {
        delete newVisibleNodes[nodeKey];
      }
    }

    setVisibleNodes(newVisibleNodes);
  };

  const renderNode = (nodeKey, level = 0) => {
    const parts = nodeKey.split(".");
    let items = pathData;
    parts.forEach((part) => {
      items = items[part] || {};
    });

    const color =
      level === 0
        ? "btn-primary"
        : level === 1
        ? "btn-success"
        : level === 2
        ? "btn-info"
        : level === 3
        ? "btn-warning"
        : "btn-secondary";
    const isLeafNode = Array.isArray(items);

    return (
      <div key={nodeKey} className={`d-flex flex-column align-items-center ${level === 1 ? "mb-5" : ""}`}>
        <button
          onClick={() => handleNodeClick(nodeKey)}
          className={`btn ${color} mb-3`}
        >
          {nodeKey.split(".").pop().toUpperCase()}
        </button>
        {visibleNodes[nodeKey] && !isLeafNode && (
          <div className="d-flex flex-wrap justify-content-center mt-2">
            {visibleNodes[nodeKey].map((childKey) =>
              renderNode(`${nodeKey}.${childKey}`, level + 1)
            )}
          </div>
        )}
        {isLeafNode && (
          <div className="mt-2 text-dark">
            <ul className="list-unstyled">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-start h-100 py-5">
      <p className="h1 mb-5 font-weight-bold">Career Roadmap</p>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <div className="mb-5">{renderNode("post_10th")}</div>
          <div className="mb-5">{renderNode("post_intermediate")}</div>
          <div className="mb-5">{renderNode("post_diploma")}</div>
          <div className="mb-5">{renderNode("post_btech")}</div>
        </>
      )}
    </div>
  );
};

export default CareerRoadmap;
