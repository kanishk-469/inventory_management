function deleteProduct(id) {
  console.log("inside deleteProduct JAVASCRIPT");
  const result = confirm("Are you sure you want to delete?");
  if (result) {
    fetch("/delete-product/" + id, { method: "POST" }).then((res) => {
      if (res.ok) {
        // location.reload();
        window.location.href = "/";
      }
    });
  }
}
