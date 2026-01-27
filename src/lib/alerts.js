import Swal from "sweetalert2";

export const confirmAction = async ({
  title = "Are you sure?",
  text = "This action cannot be undone",
  confirmText = "Yes",
}) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Cancel",
    confirmButtonColor: "#000",
    cancelButtonColor: "#aaa",
    reverseButtons: true,
  });
};

export const successAlert = (message) =>
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1800,
    showConfirmButton: false,
  });

export const errorAlert = (message) =>
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });

export const loadingAlert = (message = "Processing...") =>
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
