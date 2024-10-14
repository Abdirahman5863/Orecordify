"use client";
// import { intiallFormData, adddorderFormController } from "@/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { addcustomerformDatacontrols,intialcustomerFormData,intiallFormData } from "../../../utils";

export default function Addcustomer() {
  const [customerformData, setFormData] = useState(intialcustomerFormData);
  const [popUp, setPopUp] = useState(false);
  // async function handleSubmit() {
    
  //   const result = await createcustomer(customerformData);
  
  //   if (result) {
  //     setPopUp(false);
  //     setFormData(intialcustomerFormData);
   
  //   }
  // console.log(result)

  // }


  return (
    <div>
      <Button onClick={() => setPopUp(true)} className="bg-green-500">Add Customer</Button>
      <Dialog open={popUp} onOpenChange={setPopUp}>
        <DialogContent className="sm:max-w-[425px] space-y-4 bg-slate-200">
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogDescription>Add a new customer </DialogDescription>
          </DialogHeader>
          <form  className="space-y-4">
            {addcustomerformDatacontrols && addcustomerformDatacontrols.length > 0
              ?addcustomerformDatacontrols.map((item) => (
                  <div key={item.name} className="space-y-5">
                    <Label htmlFor={item.name} className="text-right">
                      {item.label}
                    </Label>
                    <Input
                      id={item.name}
                      name={item.name}
                      type={item.type}
                      placeholder={item.placeholder}
                      required
                      value={customerformData[item.name]}
                      onChange={(event) => setFormData({
                        ...customerformData,
                        [item.name]:event.target.value,}
                      )
                      }
                    />
                  </div>
                ))
              : null}
            <DialogFooter>
              <Button type="submit" className="bg-green-600">Add Customer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
