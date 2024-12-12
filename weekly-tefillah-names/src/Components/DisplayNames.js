// import React, { useState, useEffect } from 'react';
// import './DisplayNames.css'; 

// function DisplayNames({ email }) {
//   const [names, setNames] = useState([]);
//   const [tefilahIDs, setTefilahIDs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editingName, setEditingName] = useState(null); // To track which name is being edited
//   const [editForm, setEditForm] = useState({}); // To store the edited data

//   //const apiEndpoint = 'https://d08yejwd0a.execute-api.us-east-1.amazonaws.com/Stage2/MyNamesRead';
//   //const apiEndpointEdit = 'https://d08yejwd0a.execute-api.us-east-1.amazonaws.com/Stage2/EditName';
//   const newAPIEnpoint = 'https://21v6quf6tg.execute-api.us-east-1.amazonaws.com/Stage';
 
//   useEffect(() => {
//     if (!email) return; // Exit if no email is provided

//     const fetchNames = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`${apiEndpoint}?email=${encodeURIComponent(email)}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();

//         if (data.names && data.tefilah_ids) {
//           setNames(data.names);
//           setTefilahIDs(data.tefilah_ids);
//         } else {
//           setError('No names found for the given email.');
//         }
//       } catch (err) {
//         setError(`Error fetching names: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNames();
//   }, [email]);

//   // Match TefilahIDs with Names by NamesID
//   const getTefilahID = (namesID) => {
//     const match = tefilahIDs.find((tefilah) => tefilah.NamesID === namesID);
//     return match ? match.TefilahID : 'No TefilahID';
//   };

//   // Handle deleting a name
//   const handleDelete = (namesID) => {
//     const tefilahID = getTefilahID(namesID);

//     if (!tefilahID || tefilahID === 'No TefilahID') {
//       setError('TefilahID not found for the given NamesID.');
//       return;
//     }

//     const requestBody = {
//       body: JSON.stringify({ NamesID: namesID, TefilahID: tefilahID }),
//     };

//     fetch('https://d08yejwd0a.execute-api.us-east-1.amazonaws.com/Stage2/DeleteName', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         console.log('Response Status:', response.status);
//         return response.json();
//       })
//       .then((data) => {
//         if (data.statusCode === 200) {
//           setNames((prevNames) => prevNames.filter((name) => name.NamesID !== namesID));
//           setTefilahIDs((prevTefilahIDs) =>
//             prevTefilahIDs.filter((tefilah) => tefilah.NamesID !== namesID)
//           );
//         } else {
//           setError(data.body || 'Error deleting name.');
//         }
//       })
//       .catch((err) => {
//         setError(`Error deleting name: ${err.message}`);
//       });
//   };

//   // Handle editing
//   const handleEdit = (name) => {
//     setEditingName(name.NamesID); // Start editing this name
//     setEditForm({ ...name }); // Pre-fill the edit form with current name details
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleEditSubmit = async () => {
//     const requestBody = {
//       body: JSON.stringify(editForm),
//     };

//     try {
//       const response = await fetch(apiEndpointEdit, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();

//       if (data.statusCode === 200) {
//         setNames((prevNames) =>
//           prevNames.map((name) =>
//             name.NamesID === editForm.NamesID ? { ...name, ...editForm } : name
//           )
//         );
//         setEditingName(null); // Exit editing mode
//       } else {
//         setError('Error editing name.');
//       }
//     } catch (err) {
//       setError(`Error editing name: ${err.message}`);
//     }
//   };

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {names.length > 0 ? (
//         <div>
//           <h2>Names Associated with {email}</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Hebrew Name</th>
//                 <th>English Name</th>
//                 <th>Notes</th>
//                 <th>TefilahID</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {names.map((name) => (
//                 <tr key={name.NamesID}>
//                   {editingName === name.NamesID ? (
//                     <>
//                       <td>
//                         <input
//                           type="text"
//                           name="HebrewName"
//                           value={editForm.HebrewName || ''}
//                           onChange={handleEditChange}
//                         />
//                       </td>
//                       <td>
//                         <input
//type="text"
//                           name="EnglishName"
//                           value={editForm.EnglishName || ''}
//                           onChange={handleEditChange}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           name="Notes"
//                           value={editForm.Notes || ''}
//                           onChange={handleEditChange}
//                         />
//                       </td>
//                       <td>{getTefilahID(name.NamesID)}</td>
//                       <td>
//                         <button onClick={handleEditSubmit}>Save</button>
//                         <button onClick={() => setEditingName(null)}>Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{name.HebrewName}</td>
//                       <td>{name.EnglishName}</td>
//                       <td>{name.Notes}</td>
//                       <td>{getTefilahID(name.NamesID)}</td>
//                       <td>
//                         <button onClick={() => handleEdit(name)}>Edit</button>
//                         <button onClick={() => handleDelete(name.NamesID)}>Delete</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p></p>
//       )}
//     </div>
//   );
// }

// export default DisplayNames;

import React, { useState, useEffect } from 'react';
import './DisplayNames.css';

function DisplayNames({ email }) {
  const [names, setNames] = useState([]);
  const [tefilahIDs, setTefilahIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingName, setEditingName] = useState(null); // To track which name is being edited
  const [editForm, setEditForm] = useState({}); // To store the edited data

  const newAPIEndpoint = 'https://21v6quf6tg.execute-api.us-east-1.amazonaws.com/Prod';

  useEffect(() => {
    if (!email) return; // Exit if no email is provided

    const fetchNames = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${newAPIEndpoint}/read-names?Email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (data.names) {
          setNames(data.names);
        } else {
          setError('No names found for the given email.');
        }
      } catch (err) {
        setError(`Error fetching names: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [email]);

  const getTefilahID = (namesID) => {
    const match = tefilahIDs.find((tefilah) => tefilah.NamesID === namesID);
    return match ? match.TefilahID : 'No TefilahID';
  };

  const handleDelete = async (namesID) => {
    const tefilahID = getTefilahID(namesID);

    if (!tefilahID || tefilahID === 'No TefilahID') {
      setError('TefilahID not found for the given NamesID.');
      return;
    }

    try {
      const response = await fetch(`${newAPIEndpoint}/delete-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NamesID: namesID, TefilahID: tefilahID }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      if (data.statusCode === 200) {
        setNames((prevNames) => prevNames.filter((name) => name.NamesID !== namesID));
        setTefilahIDs((prevTefilahIDs) =>
          prevTefilahIDs.filter((tefilah) => tefilah.NamesID !== namesID)
        );
      } else {
        setError(data.body || 'Error deleting name.');
      }
    } catch (err) {
      setError(`Error deleting name: ${err.message}`);
    }
  };

  const handleEdit = (name) => {
    setEditingName(name.NamesID); // Start editing this name
    setEditForm({ ...name }); // Pre-fill the edit form with current name details
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`${newAPIEndpoint}/update-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      if (data.statusCode === 200) {
        setNames((prevNames) =>
          prevNames.map((name) =>
            name.NamesID === editForm.NamesID ? { ...name, ...editForm } : name
          )
        );
        setEditingName(null); // Exit editing mode
      } else {
        setError('Error editing name.');
      }
    } catch (err) {
      setError(`Error editing name: ${err.message}`);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {names.length > 0 ? (
        <div>
          <h2>Names Associated with {email}</h2>
          <table>
            <thead>
              <tr>
                <th>Hebrew Name</th>
                <th>English Name</th>
                <th>Notes</th>
                <th>TefilahID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name) => (
                <tr key={name.NamesID}>
                  {editingName === name.NamesID ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="HebrewName"
                          value={editForm.HebrewName || ''}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="EnglishName"
                          value={editForm.EnglishName || ''}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="Notes"
                          value={editForm.Notes || ''}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>{getTefilahID(name.NamesID)}</td>
                      <td>
                        <button onClick={handleEditSubmit}>Save</button>
                        <button onClick={() => setEditingName(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{name.HebrewName}</td>
                      <td>{name.EnglishName}</td>
                      <td>{name.Notes}</td>
                      <td>{getTefilahID(name.NamesID)}</td>
                      <td>
                        <button onClick={() => handleEdit(name)}>Edit</button>
                        <button onClick={() => handleDelete(name.NamesID)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>.</p>
      )}
    </div>
  );
}

export default DisplayNames;
