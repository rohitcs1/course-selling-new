import CheckoutClient from './checkout-client'

type CheckoutPageProps = {
  searchParams?: Promise<{
    courseId?: string
  }>
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined

  return (
    <CheckoutClient courseId={resolvedSearchParams?.courseId ?? null} />
  )
}
