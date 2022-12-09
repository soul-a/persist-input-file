import { Box, TextField } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { useFileTokenContext } from "../shared/contexts/FileTokenContext";

export default function Home() {
  const fileToken = useFileTokenContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      alert(
        "Não foi possível encontrar nenhum arquivo para que possa ser lido"
      );
      return;
    }

    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      fileToken?.updateFileContent(reader.result?.toString() || "");
    };

    reader.onerror = () => {
      alert("Ocorreu um erro na leitura do arquivo!");
    };
  };

  console.log(fileToken?.fileContent);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        p: 2,
        display: "flex",
        alignItems: "left",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        name="file-path"
        type="file"
        onChange={handleChange}
        inputProps={{ accept: "*" }}
        sx={{ maxWidth: "450px" }}
      />
      <TextField
        name="file-content"
        variant="outlined"
        fullWidth={true}
        multiline={true}
        value={fileToken?.fileContent || ""}
        sx={{
          overflowY: "auto",
        }}
      />
    </Box>
  );
}
