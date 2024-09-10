import React, { useState } from 'react';
import '../styles/pathfinder.css'; // Import the CSS for styling

const careerData = {
  "post_10th": {
    "Intermediate": {
      "streams": {
        "MPC": {
          "description": "Maths, Physics, Chemistry",
          "future_scope": {
            "Engineering": ["B.E.", "B.Tech"],
            "Bachelor_Degrees": ["B.Sc. Computer Science", "B.Sc. Mathematics"]
          }
        },
        "BIPC": {
          "description": "Biology, Physics, Chemistry",
          "future_scope": {
            "Medical": ["MBBS", "BDS", "BAMS", "BHMS"],
            "Bachelor_Degrees": ["B.Sc. Biology", "B.Sc. Biotechnology", "B.Pharmacy"]
          }
        },
        "CEC": {
          "description": "Civics, Economics, Commerce",
          "future_scope": {
            "Commerce": ["B.Com", "BBA"],
            "Arts": ["BA Economics", "BA Political Science"]
          }
        },
        "MEC": {
          "description": "Mathematics, Economics, Commerce",
          "future_scope": {
            "Commerce": ["B.Com", "BBA"],
            "Bachelor_Degrees": ["B.Sc. Statistics"]
          }
        },
        "HEC": {
          "description": "History, Economics, Civics",
          "future_scope": {
            "Arts": ["BA History", "BA Economics", "BA Political Science"]
          }
        }
      }
    },
    "Diploma": {
      "streams": {
        "CSE": {
          "description": "Computer Science Engineering",
          "future_scope": ["B.Tech CSE", "B.Sc. IT"]
        },
        "ECE": {
          "description": "Electronics and Communication Engineering",
          "future_scope": ["B.Tech ECE", "B.Sc. Electronics"]
        },
        "EEE": {
          "description": "Electrical and Electronics Engineering",
          "future_scope": ["B.Tech EEE", "B.Sc. Electrical"]
        },
        "MECH": {
          "description": "Mechanical Engineering",
          "future_scope": ["B.Tech Mechanical", "B.Sc. Mechanical"]
        },
        "Civil": {
          "description": "Civil Engineering",
          "future_scope": ["B.Tech Civil", "B.Sc. Civil"]
        }
      }
    }
  },
  "post_Intermediate": {
    "Engineering": {
      "streams": {
        "B.E.": {
          "branches": ["CSE", "ECE", "EEE", "Mechanical", "Civil"],
          "future_scope": {
            "Postgraduate": ["M.Tech", "M.S."],
            "Competitive_Exams": ["UPSC", "GATE"]
          }
        },
        "B.Tech": {
          "branches": ["CSE", "ECE", "EEE", "Mechanical", "Civil"],
          "future_scope": {
            "Postgraduate": ["M.Tech", "M.S."],
            "Competitive_Exams": ["UPSC", "GATE"]
          }
        }
      }
    },
    "Medical": {
      "courses": ["MBBS", "BDS", "BAMS", "BHMS", "BPT"],
      "future_scope": {
        "Postgraduate": ["MD", "MS", "MDS"],
        "Competitive_Exams": ["UPSC", "NEET-PG"]
      }
    },
    "Bachelor_Degrees": {
      "fields": {
        "Science": ["B.Sc. Physics", "B.Sc. Chemistry", "B.Sc. Mathematics"],
        "Commerce": ["B.Com General", "B.Com Computers", "BBA"],
        "Arts": ["BA History", "BA Political Science", "BA Literature"]
      }
    }
  },
  "post_Diploma": {
    "B.Tech_Lateral_Entry": {
      "description": "Direct entry into the second year of B.Tech in respective fields",
      "future_scope": ["M.Tech", "M.S.", "Jobs in technical fields"]
    },
    "Jobs": {
      "description": "Opportunities for diploma holders in technical fields",
      "future_scope": ["Junior Engineer", "Technician", "Lab Assistant"]
    }
  },
  "post_Engineering": {
    "M.Tech": {
      "specializations": ["CSE", "ECE", "EEE", "Mechanical", "Civil"],
      "future_scope": {
        "PhD": ["PhD in Engineering", "Research"],
        "Competitive_Exams": ["UPSC", "GATE"]
      }
    },
    "M.S.": {
      "specializations": ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"],
      "future_scope": {
        "PhD": ["PhD in Engineering", "Research"],
        "Competitive_Exams": ["UPSC", "GRE"]
      }
    },
    "MBA": {
      "specializations": ["Finance", "Marketing", "Operations", "HR"],
      "future_scope": {
        "Jobs": ["Manager", "Consultant", "Entrepreneur"],
        "Competitive_Exams": ["CAT", "XAT", "GMAT"]
      }
    },
    "UPSC": {
      "exams": ["IAS", "IPS", "IFS"],
      "future_scope": {
        "Jobs": ["Civil Services"]
      }
    }
  }
};

const CareerRoadmap = () => {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const toggleNode = (node) => {
    setExpandedNodes(prevState =>
      prevState.includes(node) ?
        prevState.filter(n => n !== node) :
        [...prevState, node]
    );
  };

  const renderTree = (nodes, parentKey = '') => {
    return Object.entries(nodes).map(([key, value]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      const isExpanded = expandedNodes.includes(currentKey);

      return (
        <div key={currentKey} className="node">
          <div className="node-title" onClick={() => toggleNode(currentKey)}>
            {key} {isExpanded ? '▼' : '▶'}
          </div>
          {isExpanded && value && typeof value === 'object' && (
            <div className="node-children">
              {value.description && (
                <div className="node-description">
                  <strong>Description:</strong> {value.description}
                </div>
              )}
              {value.future_scope && (
                <div className="node-future-scope">
                  <strong>Future Scope:</strong>
                  {Array.isArray(value.future_scope) ? (
                    <ul>
                      {value.future_scope.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    Object.entries(value.future_scope).map(([scope, items]) => (
                      <div key={scope}>
                        <strong>{scope}:</strong>
                        <ul>
                          {items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              )}
              {renderTree(value, currentKey)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="career-roadmap">
      <h1 className="title">Career Roadmap</h1>
      <div className="roadmap-container">
        {renderTree(careerData)}
      </div>
    </div>
  );
};

export default CareerRoadmap;