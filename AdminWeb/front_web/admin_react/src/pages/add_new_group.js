// Admin Management page - Add new group
// Admin can add new group to the system

// Import library
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import CSS
import styles from '../stylesheets/admin_management.module.css';

// Import Assets
import AddIcon from '../Assets/Icon/icon_add.png';
import DeleteIcon from '../Assets/Icon/icon_delete.png';
import SearchIcon from '../Assets/Icon/icon_search.png';

const AddNewGroup = () =>{

    // Attributes
    const [groups, setGroups] = useState([]);
    const [isEmptyResult, setIsEmptyResult] = useState(false);

    useEffect(() => {
        fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/api/getGroupsList')
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(errorData.error);
                  });
                }
                return response.json();
            })
            .then(data => setGroups(data))
            .catch(error => console.error('Error:', error));
    }, []); 

    const [addGroup, setAddGroup] = useState('');

    // Handle group list
    const handleGroup = (group) => {
        setAddGroup(group.target.value);
    };
    
    const handleAddGroup = () => {
        if (addGroup.trim() !== '') {
            setGroups([...groups, addGroup]);
            setAddGroup('');
        }
    };

    const handleDeleteGroup = (delete_group) => {
        const updatedGroup = groups.filter((_, i) => i !== delete_group);
        setGroups(updatedGroup);
    };

    // Search group
    const [searchGroup, setSearchGroup] = useState('');

    const handleSearchGroupChange = (event) => {
        setSearchGroup(event.target.value);
      };
    
    // const handleSearch = () => {
    //     //Add Search group
    //     console.log('Search Group Name:', searchGroup);

    //     if (searchGroup === '') {
    //         fetch('http://localhost:3001/api/getGroups')
    //         .then(response => {
    //             console.log('Response:', response);
    //             if (!response.ok) {
    //               return response.json().then(errorData => {
    //                 throw new Error(errorData.error);
    //               });
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setGroups(data);
    //             setIsEmptyResult(data.length === 0); // Check if search result is empty
    //         })
    //         .catch(error => console.error('Error:', error));
    //     } else {
    //     // fetch data, only the group being searched is displayed
    //     fetch(`http://localhost:3001/api/searchGroupName?searchGroup=${searchGroup}`)
    //         .then(response => {
    //             console.log('Response:', response);
    //             if (!response.ok) {
    //               return response.json().then(errorData => {
    //                 throw new Error(errorData.error);
    //               });
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setGroups(data);
    //             setIsEmptyResult(data.length === 0); // Check if search result is empty
    //         })
    //         .catch(error => console.error('Error:', error));
    //     }

    //     console.log('Successfully find: ' + searchGroup); 
    // };

    const handleSearch = () => {
        //Add Search group
        console.log('Search Group Name:', searchGroup);
    
        if (searchGroup.trim() === '') { 
            fetch('https://weconnect-admin-06193c688dcf.herokuapp.com/static/signin/getGroups') 
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(errorData.error);
                  });
                }
                return response.json();
            })
            .then(data => {
                setGroups(data);
                setIsEmptyResult(data.length === 0); // Check if search result is empty
            })
            .catch(error => console.error('Error:', error));
        } else {
        console.log('Search Group Name not empty:', searchGroup);
        // fetch data, only the group being searched is displayed
        fetch(`https://weconnect-admin-06193c688dcf.herokuapp.com/api/searchGroupName?searchGroup=${searchGroup}`)
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(errorData.error);
                  });
                }
                return response.json();
            })
            .then(data => {
                setGroups(data);
                setIsEmptyResult(data.length === 0); // Check if search result is empty
            })
            .catch(error => console.error('Error:', error));
        }
    
        console.log('Successfully find: ' + searchGroup); 
        console.log('isEmptyResult find: ' + isEmptyResult); 
    };
    
    useEffect(() => {
        // handleSearch();
    // eslint-disable-next-line
    }, [searchGroup]);

    const handleSearchClick = () => {
        handleSearch();
    };


    // Handle the delete and confirm box request
    const confirmModal = document.getElementById("confirm_modal");
    
    const showModal = () => {
        confirmModal.style.display = "block";
    };
    
    const closeModal = () => {
        confirmModal.style.display = "none";
    };

    const handleSubmit = event => {
        event.preventDefault();
        showModal();
    };

    const handleConfirm = () => {
        if (groups != null) {
            // Add post request (group)
            fetch('https://weconnect-admin-06193c688dcf.herokuapp.com//api/updateGroups', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groups: groups,
              })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Group updated successfully:', data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error adding group:', error);
            });

        }

        closeModal();
    };

    const handelCancel = () => {
        closeModal();
    }

    return (
        <main>
            <div id={styles.add_new_group} className={styles.admin_management}>

                {/* Heading */}
                <h1 class={styles.page_heading}>Admin Management</h1>

                {/* Subheading */}
                <h3 className={styles.sub_heading}>Manage Group</h3>

                {/* Search Group Box */}
                <div id={styles.search_box}>
                    <input type="text" placeholder="Search Group" value={searchGroup} onChange={handleSearchGroupChange}/>
                    <button onClick={handleSearchClick}><img src={SearchIcon} alt="Search Group" /></button>
                    {/* {isEmptyResult && (
                    <div className={styles.not_found_message}>No results found</div>
                    )} */}
                </div>
                

                {/* Add New Group Container */}
                <div className={styles.add_new_group_container}>
                    {/* Group List */}
                    <div className={styles.group_list}>
                        <ul className={styles.exist_group_list}>
                        {isEmptyResult && (
                            <div className={styles.not_found_message}>*No Results Found</div>
                        )}
                            {groups.map((group, delete_group) => (
                                <li className={styles.group_box} key={delete_group}>
                                    <div className={styles.each_group}>{group}</div>
                                    <button onClick={() => handleDeleteGroup(delete_group)}>
                                        <img src={DeleteIcon} alt="Delete group" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        
                        <div className={styles.add_group_box}>
                            <input className={styles.input_add_group} type="text" value={addGroup} onChange={handleGroup} placeholder="New Group"/>
                            <button onClick={handleAddGroup}>
                                <img src={AddIcon} alt="Add New Group" />
                            </button>
                        </div>
                    </div>

                    <div className={styles.button_container}>
                        <Link to="/admin_management" className={styles.no_underline}>
                            <button className={styles.button}>Cancel</button>
                        </Link>

                        <button onClick={handleSubmit} className={styles.button}>Save</button>
                    </div>
                </div>

                {/* Confirm Modal if the user trying save data */}
                <div className={styles.confirm_modal} id='confirm_modal'>
                    <div className={styles.modal_content}>
                        <div className={styles.confirm_text}>Are you sure you want to save the change?</div>
                        
                        <div className={styles.button_box}>
                            <button id='confirm_button' onClick={handleConfirm}>Confirm</button>
                            <button id='cancel_button' onClick={handelCancel}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
export default AddNewGroup;

