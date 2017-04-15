function formValidation() {
    var email = document.registration.email;
    var passid = document.registration.password;
    var fname = document.registration.firstname;
    var lname = document.registration.lastname;
    var uid = document.registration.CWID;
    var birthday = document.registration.birthday;
    var ssn = document.registration.SSN;
    {
        if (ValidateEmail(email)) {
            if (passid_validation(passid, 7, 12)) {
                if (allLetter(fname)) {
                    if (allLetter2(lname)) {
                        if (CWID_validation(uid, 8, 10)) {
                            if (Validatebirthday(birthday)) {
                                if (SSN_validation(ssn, 8, 10)) {
                                }
                            }

                        }
                    }
                }
            }
        }
        return false;
    }
    function CWID_validation(uid, mx, my) {
        var uid_len = uid.value.length;
        if (uid_len == 0 || uid_len >= my || uid_len < mx) {
            alert("User Id should not be empty / length be between " + mx + " to " + my);
            uid.focus();
            return false;
        }
        return true;
    }

    function SSN_validation(ssn, mx, my) {
        var ssn_len = ssn.value.length;
        if (ssn_len == 0 || ssn_len >= my || ssn_len < mx) {
            alert("User Id should not be empty / length be between " + mx + " to " + my);
            ssn.focus();
            return false;
        }
        return true;
    }

    function passid_validation(passid, mx, my) {
        var passid_len = passid.value.length;
        if (passid_len == 0 || passid_len >= my || passid_len < mx) {
            alert("Password should not be empty / length be between " + mx + " to " + my);
            passid.focus();
            return false;
        }
        return true;
    }
    function allLetter(fname)
    {
        var letters = /^[A-Za-z]+$/;
        if(fname.value.match(letters))
        {
            return true;
        }
        else
        {
            alert('Username must have alphabet characters only');
            fname.focus();
            return false;
        }
    }
    function allLetter2(lname)
    {
        var letters = /^[A-Za-z]+$/;
        if(lname.value.match(letters))
        {
            return true;
        }
        else
        {
            alert('Username must have alphabet characters only');
            lname.focus();
            return false;
        }
    }
    function ValidateEmail(email)
    {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.value.match(mailformat))
        {
            return true;
        }
        else
        {
            alert("You have entered an invalid email address!");
            email.focus();
            return false;
        }
    }
    function Validatebirthday(inputText)
    {
        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        // Match the date format through regular expression
        if(inputText.value.match(dateformat))
        {
            document.form1.text1.focus();
            //Test which seperator is used '/' or '-'
            var opera1 = inputText.value.split('/');
            var opera2 = inputText.value.split('-');
            lopera1 = opera1.length;
            lopera2 = opera2.length;
            // Extract the string into month, date and year
            if (lopera1>1)
            {
                var pdate = inputText.value.split('/');
            }
            else if (lopera2>1)
            {
                var pdate = inputText.value.split('-');
            }
            var dd = parseInt(pdate[0]);
            var mm  = parseInt(pdate[1]);
            var yy = parseInt(pdate[2]);
            // Create list of days of a month [assume there is no leap year by default]
            var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
            if (mm==1 || mm>2)
            {
                if (dd>ListofDays[mm-1])
                {
                    alert('Invalid date format!');
                    return false;
                }
            }
            if (mm==2)
            {
                var lyear = false;
                if ( (!(yy % 4) && yy % 100) || !(yy % 400))
                {
                    lyear = true;
                }
                if ((lyear==false) && (dd>=29))
                {
                    alert('Invalid date format!');
                    return false;
                }
                if ((lyear==true) && (dd>29))
                {
                    alert('Invalid date format!');
                    return false;
                }
            }
        }
        else
        {
            alert("Invalid date format!");
            document.form1.text1.focus();
            return false;
        }
    }

}
