import { useToast } from "@chakra-ui/react"

export default function useAnnounce() {
  const toast = useToast();
  return (status: "success" | "error", description: string) => {
    toast({
      status,
      title: status === "success" ? "Success!" : "Error",
      description,
      duration: 2000,
      isClosable: true
    });
  }
}