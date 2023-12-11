const disabled = undefined;

type Form = {
  name: string;
  address: Option<string>;
};

type None = null | undefined;

type Option<T> = T | None;

function calcInvoice(form: Form) {
  if (form.address) {
    // send to address service
    //
    return true;
  }

  throw Error("no address");
}

try {
  calcInvoice({ name: "oscar" }); //  number / undefined
} catch (e) {
  console.error("dit is een error");
}

export {};
