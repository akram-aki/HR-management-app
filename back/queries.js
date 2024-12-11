const queries = {
  dupNameCheck: "SELECT * FROM users WHERE username = $1",
  insertAttendance: `
    INSERT INTO Attendance (employee_id, date, status, justification, hours_worked)
    VALUES ($1, $2, $3, $4, $5)
  `,
  updateAttendance: `
    UPDATE Attendance
    SET  hours_worked = $1
    WHERE employee_id = $2 AND date = $3
  `,
  fetchAbsences: `SELECT * FROM Attendance WHERE employee_id = $1`,
  requestAbsence: `INSERT INTO EmployeeAbsence (employee_id, employee_name, date, justification_photo_url, selected, status)
      VALUES ($1,$2,$3,$4,$5,$6)`,
};

export { queries };
