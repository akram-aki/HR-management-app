const queries = {
  addUserQuery: `
    INSERT INTO admins (name, email, password)
    VALUES ($1, $2, $3)
  `,

  dupEmailCheck: "SELECT * FROM admins WHERE email = $1",
  updateNameQuery:
    "UPDATE admins SET name = $1  WHERE id = $2 RETURNING email, password",
  updatePasswordQuery:
    "UPDATE admins SET password = $1  WHERE id = $2 RETURNING email, password",
  updateNameAndPassQuery:
    "UPDATE admins SET name = $1 , password = $2   WHERE id = $3 RETURNING email, password",
  addPatientQuery: `
    INSERT INTO patients (first_name,last_name,adress,photo,socialsecuritynumber,illness)
    VALUES ($1,$2,$3,$4,$5,$6)
  `,
};

export { queries };
