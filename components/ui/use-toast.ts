interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

export function toast(props: ToastProps) {
  // Simple toast implementation for the demo
  console.log("Toast:", props)

  // In a real app, you would use a proper toast library
  const toastContainer = document.getElementById("toast-container")

  if (!toastContainer) {
    const container = document.createElement("div")
    container.id = "toast-container"
    container.style.position = "fixed"
    container.style.top = "20px"
    container.style.right = "20px"
    container.style.zIndex = "9999"
    document.body.appendChild(container)
  }

  const toast = document.createElement("div")
  toast.className = `p-4 mb-4 rounded-md shadow-md ${
    props.variant === "destructive"
      ? "bg-red-500 text-white"
      : props.variant === "success"
        ? "bg-green-500 text-white"
        : "bg-white text-gray-900 border border-gray-200"
  }`

  const title = document.createElement("div")
  title.className = "font-bold"
  title.textContent = props.title

  toast.appendChild(title)

  if (props.description) {
    const description = document.createElement("div")
    description.className = "text-sm mt-1"
    description.textContent = props.description
    toast.appendChild(description)
  }

  document.getElementById("toast-container")?.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transition = "opacity 0.3s ease-out"

    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 3000)
}
