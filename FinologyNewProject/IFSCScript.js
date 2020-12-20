$(function () {
    $("#tblBankDetails").hide();
    $("#txtUserName").focus()
});

$(document).on("click", "#btnSubmit", function () {

    var frmValid = $("#frmUser").valid();
    if (frmValid) {
        var bankAccountNumber = $("#txtBankAccountNumber").val();
        var cnfBankAccountNumber = $("#txtConfirmBankAccountNumber").val();
        if (bankAccountNumber != cnfBankAccountNumber) {
            swal({
                title: "",
                text: "Account Number is not Matched",
                icon: "error",
            });
            $("#txtBankAccountNumber").css("border-color", "red");
            $("#txtConfirmBankAccountNumber").css("border-color", "red");
            $("#tblBankDetails").hide();
            return;
        }
        else {
            $("#txtBankAccountNumber").css("border-color", "#ced4da");
            $("#txtConfirmBankAccountNumber").css("border-color", "#ced4da");
        }
        var Code = $("#txtIFSCDetails").val();
        $.ajax({
            type: "post",
            url: "/Home/FindBankDetailsByIFSC",
            data: "{ 'Code': " + JSON.stringify(Code) + "}",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (response) {

                if (response != null) {
                    if (response.retVal == true) {
                        swal({
                            title: "",
                            text: "Branch Details Found",
                            icon: "success",
                        }).then(() => {
                            var BankDetails = JSON.parse(response.BranchDetail);
                            $("#tbodyBankDetails").empty();
                            $("#tblBankDetails").show();

                            $("#BankName").text(BankDetails.BANK);
                            var markUp = "<tr><td>" + BankDetails.BRANCH + "</td><td>" + BankDetails.CENTRE + "</td><td>" + BankDetails.DISTRICT + "</td><td>" + BankDetails.STATE +
                                "</td><td>" + BankDetails.ADDRESS + "</td><td>" + BankDetails.CONTACT + "</td><td>" + BankDetails.MICR + "</td><td>" + BankDetails.UPI +
                                "</td><td>" + BankDetails.RTGS + "</td><td>" + BankDetails.CITY + "</td><td>" + BankDetails.NEFT + "</td><td>" + BankDetails.IMPS + "</td><td>" + BankDetails.BANK +
                                "</td><td>" + BankDetails.BANKCODE + "</td><td>" + BankDetails.IFSC + "</td></tr>";
                            $("#tbodyBankDetails").append(markUp);
                        });
                    }
                    else {
                        $("#tblBankDetails").hide();
                        swal({
                            title: "",
                            text: response.ErrorMsg,
                            icon: "error",
                        }).then(() => {
                            $("#txtIFSCDetails").focus();
                        });

                    }

                }

            },
            error: function (xhr) {
                alert("Error Occured");
            }
        })

    }
    else {
        $("#tbodyBankDetails").empty();
        $("#tblBankDetails").hide();
    }
});