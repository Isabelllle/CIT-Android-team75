// Admin Management page - Add new group
// Admin can add new group to the system

// Import library
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import CSS
import styles from '../stylesheets/admin_management.module.css';

// Import Assets
import AddIcon from '../Assets/Icon/icon_add.png';
import DeleteIcon from '../Assets/Icon/icon_delete.png';
import SearchIcon from '../Assets/Icon/icon_search.png';

const AddNewGroup = () =>{

    // Attributes
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/getGroupsList')
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
    const [giveWarning, setWarning] = useState(false);

    // Handle group list
    const handleGroup = (group) => {
        setAddGroup(group.target.value);
    };
    
    const [duplicateWarning, setDuplicateWarning] = useState(false);

    const handleAddGroup = () => {
        if (addGroup.trim() !== '') {
            if (groups.includes(addGroup.trim())) {
                setDuplicateWarning(true);
            } else {
                setDuplicateWarning(false);
                setGroups([...groups, addGroup]);
                setAddGroup('');
            }
        }
    };
    

    const handleDeleteGroup = (delete_group) => {
        const updatedGroup = groups.filter((_, i) => i !== delete_group);
        setGroups(updatedGroup);
    };

    // Search group
    const [searchGroup, setSearchGroup] = useState('');
    const [notFoundWarning, setNotFoundWarning] = useState(false);


    const handleSearchGroupChange = (event) => {
        setSearchGroup(event.target.value);
      };
    
    const handleSearch = () => {
        //Add Search group
        console.log('Search Group Name:', searchGroup);

        if (searchGroup == '') {
            fetch('http://localhost:3001/api/getGroups')
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
        } else {
        // fetch data, only the group being searched is displayed
        fetch(`http://localhost:3001/api/searchGroupName?searchGroup=${searchGroup}`)
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
                setNotFoundWarning(data.length === 0);
            })
            .catch(error => console.error('Error:', error));
        }

        console.log('Successfully find: ' + searchGroup); 
    };

    useEffect(() => {
        handleSearch();
    }, [searchGroup]);


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
            fetch('http://localhost:3001/api/updateGroups', {
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

        } else {
            setWarning(true);
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
                    <button onClick={handleSearch}><img src={SearchIcon} alt="Search Group" /></button>
                    {notFoundWarning && <p className={styles.warning}>Not found!</p>}
                </div>

                {/* Add New Group Container */}
                <div className={styles.add_new_group_container}>
                    
                    {/* Group List */}
                    <div className={styles.group_list}>
                        <ul className={styles.exist_group_list}>
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
                            {duplicateWarning && <p className={styles.warning}>Group name already exists!</p>}
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
