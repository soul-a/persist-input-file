import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IFileTokenContext {
  updateFileContent: (value: String) => void;
  fileContent: String | undefined;
}

const FileTokenContext = createContext<IFileTokenContext | null>(null);

// Hook use context
export const useFileTokenContext = () => useContext(FileTokenContext);

interface IPropsFileTokenProvider {
  children: ReactNode;
}

export const FileTokenProvider = (props: IPropsFileTokenProvider) => {
  // Extract props
  const { children } = props;

  const [fileContent, setFileContent] = useState<String>("");

  const updateFileContent = useCallback((value: String) => {
    if (!value) throw new Error("O conteúdo não pode vazio ou nulo!");

    // Sets the file hook and create/update localStorage
    try {
      setFileContent(value);
      localStorage.setItem("fileToken", JSON.stringify(value));
    } catch (e) {
      throw new Error("Não possível atualizar os valores do fileToken!");
    }
  }, []);

  useEffect(() => {
    try {
      const storageFileContent = JSON.parse(
        localStorage.getItem("fileToken") || ""
      );
      updateFileContent(storageFileContent);
    } catch (error) {
      console.error(error);
      alert("Não foi possível reucperar os conteúdo do arquivo!");
    }
  });

  return (
    <FileTokenContext.Provider value={{ updateFileContent, fileContent }}>
      {children}
    </FileTokenContext.Provider>
  );
};
