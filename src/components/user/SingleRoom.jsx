import React from 'react'

const SingleRoom = () => {
    return (
        <div class="max-w-6xl mx-auto p-4">
            <h1 class="text-3xl font-bold mb-4">Cozy Cottage at Snarby, close to Tromsø.</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2">
                    <img src="https://placehold.co/600x400" alt="Cozy Cottage main view" class="w-full rounded-lg mb-4" />
                    <div class="grid grid-cols-3 gap-2">
                        <img src="https://placehold.co/200x150" alt="Cozy Cottage view 1" class="w-full rounded-lg" />
                        <img src="https://placehold.co/200x150" alt="Cozy Cottage view 2" class="w-full rounded-lg" />
                        <div class="relative">
                            <img src="https://placehold.co/200x150" alt="Cozy Cottage view 3" class="w-full rounded-lg" />
                            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg rounded-lg">Show more photos</div>
                        </div>
                    </div>
                </div>
                <div class="bg-card p-4 rounded-lg shadow-lg">
                    <div class="mb-4">
                        <span class="text-xl font-bold">Price: ₹2000/per night</span>
                    </div>
                    <form class="space-y-4">
                        <div class="flex space-x-2">
                            <input type="date" class="w-1/2 p-2 border rounded-lg" placeholder="Check-in" />
                            <input type="date" class="w-1/2 p-2 border rounded-lg" placeholder="Check-out" />
                        </div>
                        <input type="number" class="w-full p-2 border rounded-lg" placeholder="Number of guests" />
                        <button class="w-full bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/80">Book it</button>
                    </form>
                </div>
            </div>
            <div class="mt-8">
                <h2 class="text-2xl font-bold mb-4">Description</h2>
                <p class="text-muted-foreground mb-4">
                    Cozy stay in popular belief. Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                    professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                    literature, discovered the undoubtable source.
                </p>
                <ul class="list-disc list-inside mb-4">
                    <li>Check-in time: 12AM</li>
                    <li>Check-out time: 12PM</li>
                    <li>Max Guests: 2</li>
                    <li>Bedrooms: 2</li>
                    <li>Bathrooms: 2</li>
                </ul>
                <p class="text-muted-foreground mb-4">Perks: Wi-Fi, Free Parking, TV</p>
                <p class="text-muted-foreground mb-4">Your Host: Robin Kjøsøy T R</p>
                <p class="text-muted-foreground mb-4">Location: Tracheery, Kannur, Kerala</p>
                <p class="text-muted-foreground mb-4">Address here</p>
            </div>
            <div class="mt-8">
                <h2 class="text-2xl font-bold mb-4">5 review</h2>
                <div class="space-y-4">
                    <div class="border-b pb-4">
                        <h3 class="font-bold">Bharati</h3>
                        <p class="text-sm text-muted-foreground">⭐⭐⭐⭐⭐ April 2023</p>
                        <p class="text-muted-foreground">
                            The place was awesome, had a peaceful sleep and people were so kind and helpful. Food(Dinner) was yummy and breakfast was so satisfying with pure cow milk chai.. just lov.
                        </p>
                    </div>
                    <div class="border-b pb-4">
                        <h3 class="font-bold">Bharati</h3>
                        <p class="text-sm text-muted-foreground">⭐⭐⭐⭐⭐ April 2023</p>
                        <p class="text-muted-foreground">
                            The place was awesome, had a peaceful sleep and people were so kind and helpful. Food(Dinner) was yummy and breakfast was so satisfying with pure cow milk chai.. just lov.
                        </p>
                    </div>
                    <button class="text-primary hover:underline">Show more</button>
                </div>
            </div>
        </div>
    )
}

export default SingleRoom