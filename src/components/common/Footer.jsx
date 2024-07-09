import React from 'react'

const Footer = () => {
    return (
        <div class="p-8 prose dark:prose-invert font-poppins">
            <footer class="bg-card text-card-foreground py-4 border-t border-border">
                <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div class="text-lg font-semibold">GetAway</div>
                    <div class="flex space-x-4 my-2 md:my-0">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="bg-secondary text-secondary-foreground p-2 rounded-full">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.0342 0H14.9658C6.70044 0 0 6.70044 0 14.9658V15.0342C0 23.2996 6.70044 30 14.9658 30H15.0342C23.2996 30 30 23.2996 30 15.0342V14.9658C30 6.70044 23.2996 0 15.0342 0Z" fill="#383D38" />
                                <path d="M19.64 6.10339H10.3571C7.79259 6.10339 5.70627 8.18972 5.70627 10.7543V19.2467C5.70627 21.8113 7.79259 23.8976 10.3571 23.8976H19.64C22.2045 23.8976 24.2908 21.8113 24.2908 19.2467V10.7543C24.2908 8.18972 22.2045 6.10339 19.64 6.10339ZM7.34695 10.7543C7.34695 9.09467 8.69754 7.74408 10.3571 7.74408H19.64C21.2996 7.74408 22.6502 9.09467 22.6502 10.7543V19.2467C22.6502 20.9063 21.2996 22.2569 19.64 22.2569H10.3571C8.69754 22.2569 7.34695 20.9063 7.34695 19.2467V10.7543Z" fill="white" />
                                <path d="M15.0064 19.3251C17.3913 19.3251 19.3325 17.3848 19.3325 14.999C19.3325 12.6131 17.3923 10.6729 15.0064 10.6729C12.6206 10.6729 10.6803 12.6131 10.6803 14.999C10.6803 17.3848 12.6206 19.3251 15.0064 19.3251ZM15.0064 12.3146C16.4874 12.3146 17.6919 13.5191 17.6919 15C17.6919 16.4809 16.4874 17.6854 15.0064 17.6854C13.5255 17.6854 12.321 16.4809 12.321 15C12.321 13.5191 13.5255 12.3146 15.0064 12.3146Z" fill="white" />
                                <path d="M19.7277 11.372C20.3699 11.372 20.8934 10.8497 20.8934 10.2064C20.8934 9.56318 20.371 9.0408 19.7277 9.0408C19.0845 9.0408 18.5621 9.56318 18.5621 10.2064C18.5621 10.8497 19.0845 11.372 19.7277 11.372Z" fill="white" />
                            </svg>

                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="bg-secondary text-secondary-foreground p-2 rounded-full">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.9979 15.0005C29.9979 22.5765 24.3824 28.8396 17.0873 29.856C16.4052 29.506 15.7073 30 14.9989 30C14.1813 30 13.3783 29.9348 12.5963 29.8087C5.45474 28.6589 0 22.4661 0 15.0005C0 6.71618 6.71595 0 15 0C23.2841 0 30 6.71618 30 15.0005H29.9979Z" fill="#383D38" />
                                <path d="M17.0798 12.0447V15.3124H21.122L20.4819 19.7142H17.0798V29.8558C16.3977 29.9504 15.6998 29.9998 14.9914 29.9998C14.1738 29.9998 13.3708 29.9346 12.5888 29.8085V19.7142H8.8609V15.3124H12.5888V11.3143C12.5888 8.83379 14.5994 6.82208 17.0809 6.82208V6.82419C17.0882 6.82419 17.0945 6.82208 17.1019 6.82208H21.123V10.629H18.4955C17.7146 10.629 17.0809 11.2628 17.0809 12.0437L17.0798 12.0447Z" fill="white" />
                            </svg>

                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="bg-secondary text-secondary-foreground p-2 rounded-full">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.9979 15.0005C29.9979 22.5765 24.3824 28.8396 17.0873 29.856C16.4052 29.9506 15.7073 30 14.9989 30C14.1813 30 13.3783 29.9348 12.5963 29.8087C5.45474 28.6589 0 22.4661 0 15.0005C0 6.71618 6.71595 0 15 0C23.2841 0 30 6.71618 30 15.0005H29.9979Z" fill="#383D38" />
                                <path d="M6.08741 6.61646L13.0051 15.8656L6.04431 23.3859H7.61137L13.7062 16.8021L18.6301 23.3859H23.9619L16.6553 13.6164L23.1348 6.61646H21.5677L15.9553 12.6799L11.4202 6.61646H6.08845H6.08741ZM8.39121 7.7705H10.8401L21.656 22.2318H19.2071L8.39121 7.7705Z" fill="white" />
                            </svg>

                        </a>
                    </div>
                    <div class="text-sm text-muted-foreground">Copyright © 2024 GetAway Pvt Ltd. All rights reserved.</div>
                </div>
            </footer>
        </div>
    )
}

export default Footer