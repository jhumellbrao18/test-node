function userDisplay() {
  console.log("Attempting to fetch data...");

  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    console.log("Ready state:", this.readyState);

    if (this.readyState === 4) {
      console.log("Request complete.");
      if (this.status === 200) {
        try {
          const residents = JSON.parse(this.responseText);
          console.log("Fetched Residents:", residents);

          const container = document.getElementById("container");
          container.innerHTML = "";

          residents.forEach((resident) => {
            const div = document.createElement("div");
            div.innerHTML = `
              <h1>${resident.first_name} ${resident.last_name}</h1>
              <p>${resident.email}</p>
              <button onclick="openUpdateModal(${resident.id}, '${resident.first_name}', '${resident.last_name}', '${resident.email}')">Update</button>
              <button onclick="openViewModal('${resident.first_name}', '${resident.last_name}', '${resident.email}')">View</button>
              <button onclick="deleteResident(${resident.id})">delete</button>
            `;
            container.appendChild(div);
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        console.error("Error fetching data:", this.statusText);
      }
    }
  };

  req.open("GET", "http://localhost:5000/apiResident");
  req.send();
}

function deleteResident(residentId) {
  if (confirm("Are you sure you want to delete this resident?")) {
    const req = new XMLHttpRequest();
    req.open(
      "DELETE",
      `http://localhost:5000/deleteResident/${residentId}`,
      true
    );

    req.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          userDisplay();
        } else {
          console.error("Error deleting resident:", this.statusText);
        }
      }
    };

    req.send();
  }
}

function openUpdateModal(id, first_name, last_name, email) {
  document.getElementById("updateFirstName").value = first_name;
  document.getElementById("updateLastName").value = last_name;
  document.getElementById("updateEmail").value = email;
  document.getElementById("residentId").value = id;
  document.getElementById("updateModal").style.display = "block";
}

function closeModal() {
  document.getElementById("updateModal").style.display = "none";
}

function submitUpdatedResident() {
  const updatedFirstName = document.getElementById("updateFirstName").value;
  const updatedLastName = document.getElementById("updateLastName").value;
  const updatedEmail = document.getElementById("updateEmail").value;
  const residentId = document.getElementById("residentId").value;

  const updatedResident = {
    first_name: updatedFirstName,
    last_name: updatedLastName,
    email: updatedEmail,
  };

  fetch(`http://localhost:5000/updateResident/${residentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedResident),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update resident");
      }

      userDisplay();
    })
    .catch((error) => {
      console.error("Error updating resident:", error);
    });
}

function openViewModal(first_name, last_name, email) {
  const viewDetails = document.getElementById("viewDetails");
  viewDetails.innerHTML = `
    <p><strong>First Name:</strong> ${first_name}</p>
    <p><strong>Last Name:</strong> ${last_name}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;
  document.getElementById("viewModal").style.display = "block";
}

// Function to close the view modal
function closeViewModal() {
  document.getElementById("viewModal").style.display = "none";
}
userDisplay();
