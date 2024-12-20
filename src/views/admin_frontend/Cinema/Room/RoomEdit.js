// Mock data for testing
const mockRoomData = {
    roomName: "Phòng chiếu 1",
    numRows: 3,
    rows: [
        { rowLetter: "A", seats: 10, seatType: "single" },
        { rowLetter: "B", seats: 12, seatType: "double" },
        { rowLetter: "C", seats: 8, seatType: "single" }
    ]
};

// Populate initial data
document.getElementById('editRoomName').value = mockRoomData.roomName;
document.getElementById('editNumRows').value = mockRoomData.numRows;

// Show seat rows based on mock data
document.getElementById('editConfirmRowsBtn').addEventListener('click', () => {
    const rowCount = parseInt(document.getElementById('editNumRows').value);
    if (!rowCount || rowCount <= 0) {
        alert('Vui lòng nhập số hàng ghế hợp lệ!');
        return;
    }

    const rowList = document.getElementById('editSeatRowList');
    rowList.innerHTML = ''; // Clear previous rows
    for (let i = 0; i < rowCount; i++) {
        const rowLetter = String.fromCharCode(65 + i); // Create row names A, B, C...
        const rowData = mockRoomData.rows.find(row => row.rowLetter === rowLetter);
        
        const listItem = document.createElement('div');
        listItem.className = 'd-flex justify-content-between align-items-center seat-row';
        listItem.innerHTML = `
            <span>Hàng ${rowLetter}</span>
            <div class="seat-preview mt-2 d-flex flex-wrap gap-1" id="row${rowLetter}">
                ${generateSeats(rowData)}
            </div>
            <button class="btn btn-outline-primary btn-sm edit-row" data-row="${rowLetter}">
                <i class="bi bi-pencil"></i> Chỉnh sửa
            </button>
        `;
        rowList.appendChild(listItem);
    }

    document.getElementById('editSeatEditContainer').style.display = 'block';
});

// Function to generate seat preview
function generateSeats(rowData) {
    let seatHTML = '';
    for (let i = 1; i <= rowData.seats; i++) {
        const seatClass = rowData.seatType === "single" ? "bg-danger" : "bg-primary";
        seatHTML += `<span class="seat ${seatClass} text-white p-1">${rowData.rowLetter}${i}</span>`;
    }
    return seatHTML;
}

// Show modal for editing seats
document.getElementById('editSeatRowList').addEventListener('click', (event) => {
    if (event.target.closest('.edit-row')) {
        const rowLetter = event.target.closest('.edit-row').getAttribute('data-row');
        document.getElementById('editCurrentRow').value = rowLetter;
        document.getElementById('editSeatCount').value = ''; // Clear previous seat count
        document.querySelector('[name="editSeatType"][value="single"]').checked = true;

        const modalInstance = new bootstrap.Modal(document.getElementById('editSeatModal'));
        modalInstance.show();
    }
});

// Save seat edits
document.getElementById('saveEditSeatsBtn').addEventListener('click', () => {
    const rowLetter = document.getElementById('editCurrentRow').value.trim();
    const seatCount = parseInt(document.getElementById('editSeatCount').value.trim());
    const seatType = document.querySelector('[name="editSeatType"]:checked').value;

    if (!seatCount || seatCount <= 0 || seatCount > 20) {
        alert('Vui lòng nhập số ghế từ 1 đến 20!');
        return;
    }

    const row = mockRoomData.rows.find(r => r.rowLetter === rowLetter);
    row.seats = seatCount;
    row.seatType = seatType;

    // Update seat preview
    const rowElement = document.getElementById(`row${rowLetter}`);
    rowElement.innerHTML = generateSeats(row);

    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('editSeatModal'));
    modalInstance.hide();
});

// Save room edits
document.getElementById('saveEditRoomBtn').addEventListener('click', () => {
    // Save edited room data logic here
    alert('Lưu chỉnh sửa phòng chiếu thành công!');
});


