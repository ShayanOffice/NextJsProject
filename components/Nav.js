import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <ul className="flex items-center w-full px-32 space-y-8 ">
                <li><Link href='/Karbaran'>صفحه اصلی</Link></li>
                <li className="items-center justify-center align-middle border-2 border-black"><Link href='/'>اطلاعات سخت افزاری</Link></li>
                <li><Link href='/'>اطلاعات پایه</Link></li>
                <li><Link href='/Karbaran'>کاربران</Link></li>
                <li><Link href='/'>فعالیتها</Link></li>
                <li><Link href='/ChangePassword'>تغییر کلمه عبور</Link></li>
                <li><Link href='/'>خروج</Link></li>
            </ul>
        </nav>
    )
}
