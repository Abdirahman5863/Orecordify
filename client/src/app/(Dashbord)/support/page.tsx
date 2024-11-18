
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Support = () => {
  return (
    <div className="flex justify-center items-center py-12 ">
      <Card className="w-full max-w-sm  bg-[#fafada]">
        <CardHeader>
          <CardTitle className="text-center">Support Orecordify</CardTitle>
          <CardDescription className="text-center">
            Help us improve and maintain Orecordify. Your contribution is highly appreciated!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_blank"
            className="flex flex-col items-center"
          >
            <input type="hidden" name="business" value="flexyman2020@gmail.com" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="item_name" value="Support Orecordify" />
            <input type="hidden" name="currency_code" value="USD" />
            <Button
              type="submit"
              variant="default"
              className="bg-green-500 text-white hover:bg-green-600 focus:ring-green-400"
            >
              Donate with PayPal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}

export default Support