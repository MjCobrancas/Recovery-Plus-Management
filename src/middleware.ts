import { NextRequest, NextResponse } from "next/server";
import { parseJWT } from "./utils/ParseJWT";
import { ITokenUserValues } from "./interfaces/Generics";
import { secondRoutes, actionRoutes } from "@/api/routes"
import { ActionRoutes, SecondRoutes } from "./interfaces/IRoutes";
import { verifyUserToken } from "./api/generics/verifyToken";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('user')?.value

	let validRoute = false
	const regex = /\/[a-z-]+\/*[\w-]*/g
	const { pathname } = request.nextUrl

	if (pathname == "/login") {
		const isValidToken = await verifyUserToken()

		if (!isValidToken) {
			return
		}

		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/`)
	}

	let path = pathname.match(regex)

	if (!token) {
		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
	}

	const isValidToken = await verifyUserToken()

	if (!isValidToken) {
		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
	}

	if (!path) {

		if (pathname == "/") {
			return NextResponse.next()
		}

		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
	}
	
	const pathName = path.join('')

	const tokenUserValues: ITokenUserValues | null = parseJWT(token)

	if (tokenUserValues == null) {
		return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
	}

	const validRoutes: Array<SecondRoutes> = secondRoutes.filter((e) => {
		return e.permissions.some((e: number) => {
			return e == Number(tokenUserValues.permission)
		})
	})

	validRoutes.map((item: SecondRoutes) => {
		if (item.route == pathName) {
			validRoute = true
		}
	})

	if (!validRoute) {
		const pathNameWithRegex = pathname.match(/\/[\w-]+\/[\w-]+/g)
		const pathNameWithRegex2 = pathNameWithRegex != null ? pathNameWithRegex.join('') : ""
		const validActionRoutes: Array<ActionRoutes> = actionRoutes.filter((e) => {
			return e.permissions.some((e: number) => {
				return e == Number(tokenUserValues.permission)
			})
		})

		validActionRoutes.map((item: ActionRoutes) => {
			if (item.route == pathNameWithRegex2) {
				validRoute = true
			}
		})

		if (!validRoute) {
			return NextResponse.redirect(`${process.env.FRONTEND_DOMAIN}/login`)
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/login', '/user', '/user/:path*', '/register', '/register/:path*']
}