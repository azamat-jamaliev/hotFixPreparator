package zipHelper

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
)

func UnzipPackage(fileName, target string) ([]string, error) {
	var stdout []byte
	exists := false

	targetFolder, err := filepath.Abs(target)
	if err == nil {
		exists, err = dirExists(targetFolder)
		if err == nil {
			if exists {
				log.Println("DEBUG: folder [", targetFolder, "] exists so removing the folder first")
				err = os.RemoveAll(targetFolder)
			}
			if err == nil {
				cmd := exec.Command("unzip", fileName, "-d", targetFolder)
				stdout, err = cmd.Output()
				if err == nil {
					log.Println("DEBUG: ", string(stdout))

					var files []string
					if err = filepath.Walk(targetFolder, func(path string, info os.FileInfo, err error) error {
						if !info.IsDir() {
							if relPath, e := filepath.Rel(targetFolder, path); e == nil {
								files = append(files, relPath)
							} else {
								return e
							}
						}
						return nil
					}); err == nil {
						return files, nil
					}
				}
			}
		}
	}
	return nil, err
}
func dirExists(path string) (bool, error) {
	stat, err := os.Stat(path)
	if err == nil && stat.IsDir() {
		return true, nil
	} else if os.IsNotExist(err) {
		return false, nil
	} else if !stat.IsDir() {
		return false, fmt.Errorf("[%s] is file, however directory is expected", path)
	}
	return false, err
}
