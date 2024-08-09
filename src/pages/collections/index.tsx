import { useRouter } from "next/router"

export default function Collections() {
  const router = useRouter()

  router.push('/shop')
  return null
}
