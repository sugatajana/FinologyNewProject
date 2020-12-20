using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class mUser
    {
        [Display(Name = "Customer Name")]
        [Required(ErrorMessage = "Customer Name is required")]
        public string userName { get; set; }

        [Display(Name = "Bank Account Number")]
        [Required(ErrorMessage = "Bank Account Number is required")]
        public long bankAccountNumber { get; set; }

        [Display(Name = "Verify Bank Account Number")]
        [Required(ErrorMessage = "Confirm Bank Account Number is required")]
        public long confirmBankAccountNumber { get; set; }

        [Display(Name = "IFSC Code")]
        [Required(ErrorMessage = "IFSC Code is required")]
        [MinLength(11, ErrorMessage = "It Should be atleast 11 characters")]
        [MaxLength(11, ErrorMessage = "It Should not be more than 11 characters")]
        public string IFSCDetails { get; set; }
    }
}
