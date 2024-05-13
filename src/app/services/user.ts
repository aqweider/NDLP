import validator from 'validator';

type registerUser = {
  targetedSector: string[];
  firstName: string;
  lastName: string;
  organizationName: string;
  position: string;
  projectBrief: string;
  email: string;
  phoneNumber: string;
};

export const registerUser = async (props: registerUser) => {
  const {
    targetedSector,
    firstName,
    lastName,
    organizationName,
    position,
    projectBrief,
    email,
    phoneNumber,
  } = props;
  try {
    const formdata = new FormData();
    formdata.append('type', 'signup-form');
    formdata.append('action', 'codex_get_ajax');
    formdata.append('sector', String(targetedSector));
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);
    formdata.append('email', email);

    if (!validator.isEmpty(projectBrief.trim())) {
      formdata.append('project_brief', projectBrief);
    }
    if (!validator.isEmpty(organizationName.trim())) {
      formdata.append('organization_name', organizationName);
    }
    if (!validator.isEmpty(position.trim())) {
      formdata.append('position', position);
    }
    if (!validator.isEmpty(phoneNumber.trim())) {
      formdata.append('phone_number', phoneNumber);
    }
   
    const response = await fetch(
      'https://daleel.gov.sa/wp-admin/admin-ajax.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',

          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formdata,
      },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return { status: 'error' };
  }
};
